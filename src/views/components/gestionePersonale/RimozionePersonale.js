import React from 'react'
import '../../../App.css'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import SuccessPopUp from '../App/successPopUp'
export default class RimozionePersonale extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      popUp: false
    }
    this.closePopUp = this.closePopUp.bind(this)
  }

  closePopUp () {
    this.setState({ popUp: false })
    window.location.reload(false)
  }

  rimozionePersonale (email) {
    axios.post('http://localhost:8080/api/personale/remove', { email: email })
      .then(response => {
        if (response.data.message === true) {
          this.setState({ popUp: true })
        } else if (response.data.name != null) { this.errorHandler(response.data) }
      })
      .catch((error) => {
        console.log('ciao')
        console.log(error)
      })
  }

  // Inseririre post per la rimozione che prende i campi di props.obj
  render () {
    return (
      <div id='root'>
        {this.state.popUp && <SuccessPopUp message='Rimozione Personale avvenuta con successo!' handleClose={this.closePopUp} />}
        <div className='row-block justify-content-center '>
          <div className='cardProfile user-card-full'>
            <div className='row m-l-0 m-r-0'>
              <div className='col-sm-4 bg-c-lite-green user-profile'>
                <div className='card-block text-center text-white'>
                  <div className='m-b-25'><img
                    className='iconaUtente'
                    src='https://img.icons8.com/bubbles/100/000000/under-computer.png'
                    className='img-radius'
                    alt='User-Profile-Image'
                                           />
                  </div>
                  <h6 className='f-w-600 text-uppercase'>{this.props.obj.nome} {this.props.obj.cognome}</h6>
                  <i className=' mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16' />
                </div>
              </div>
              <div className='col-sm-8'>
                <div className='card-block'>
                  <h5 className='m-b-20 p-b-5 b-b-default f-w-600'>INFORMAZIONI
                    PERSONALI
                  </h5>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <p className='m-b-10 f-w-600'>Email:</p>
                      <h6 className='text-muted f-w-400'>{this.props.obj.email}</h6>
                      <p className='m-b-10 f-w-600'>Nome:</p>
                      <h6 className='text-muted f-w-400'>{this.props.obj.nome}</h6>
                      <p className='m-b-10 f-w-600'>Cognome:</p>
                      <h6 className='text-muted f-w-400'>{this.props.obj.cognome}</h6>
                      <p className='m-b-10 f-w-600'>Numero di telefono:</p>
                      <h6 className='text-muted f-w-400'>{this.props.obj.numeroTelefono}</h6>
                      <p className='m-b-10 f-w-600'>Data di nascita:</p>
                      <h6 className='text-muted f-w-400'>{this.props.obj.dataDiNascita}</h6>
                    </div>

                  </div>
                  <Button type='submit' className='btn-block btn-primary' onClick={() => this.rimozionePersonale(this.props.obj.email)}>Rimuovi</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
