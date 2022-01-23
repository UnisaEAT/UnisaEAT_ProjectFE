import React from 'react'
import { Form, Button, Col, Row, Card } from 'react-bootstrap'
import axios from 'axios'
import Popup from '../App/successPopUp'
import moment from 'moment'
import '../../styles/gestioneTicket/ticketCSS.css'

export default class RisoluzioneTicket extends React.Component {
  // Costruttore di props
  constructor (props) {
    super(props)
    this.state = {
      soluzione: '',
      popUp: false
    }
    this.errorHandler = this.errorHandler.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeSoluzione = this.onChangeSoluzione.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  closePopUp () {
    this.setState({ popUp: false })
    window.location.reload()
  }

  errorHandler (error) {
    const inputError = error.name
    const errorMessage = error.message

    const rootElement = document.getElementById(inputError)

    if (rootElement.childNodes.length < 3) {
      const element = document.createElement('h1')
      element.id = inputError
      element.textContent = errorMessage
      element.style = 'color:red;font-size:15px'
      rootElement.appendChild(element)
    }
  }

  errorRemoverOnChange (e) {
    const parent = document.getElementById(e.target.id)
    if (parent.childNodes.length > 2) { parent.removeChild(parent.lastElementChild) }
  }

  // Handlers definition
  onChangeSoluzione (e) {
    this.errorRemoverOnChange(e)
    this.setState({
      soluzione: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    // Oggetto da passare con il POST al controller per la lettura dei campi del form
    const Ticket = {
      titolo: this.props.obj.titolo,
      soluzione: this.state.soluzione,
      mail: this.props.obj.email,
      email: localStorage.getItem('email'),
      ruolo: localStorage.getItem('ruolo')
    }

    this.risoluzioneTicket(Ticket)
  }

  risoluzioneTicket (Ticket) {
    console.log(Ticket)
    axios.post('http://localhost:8080/api/ticket/update', Ticket)
      .then(response => {
        console.log(response.data)
        if (response.data.message === 'Soluzione del ticket avvenuta con successo') {
          this.setState({ popUp: true })
        } else if (response.data.name != null) { this.setState({ message: response.data.message }) }
        this.errorHandler(response.data)
      })
      .catch((error) => {
        console.log('ciao')
        console.log(error)
      })
  }

  render () {
    console.log(this.props.obj)
    if (localStorage.getItem('ruolo') === 'admin') {
      return (
        <div id='root'>
          {/* Se popUp (boolean) è true */}
          {this.state.popUp && <Popup message='Risoluzione avvenuta con successo!' handleClose={this.closePopUp} />}

          <Card className='my-10 mx-auto col-xl-7 justify-content-center text-center'>
            <h1>Risoluzione ticket</h1><br />
            <h6>{this.props.obj.email}</h6>
            <h6>{moment(this.props.obj.date).format('DD MMM, YYYY')}</h6>
            <h3 className='mt-5'>{this.props.obj.titolo}</h3>
            <h5>{this.props.obj.problema}</h5>

            <Form onSubmit={this.handleSubmit}>
              <Row className='mb-3 mt-5'>
                <Form.Group id='soluzione' as={Col}>
                  <Form.Label>Soluzione</Form.Label>
                  <Form.Control className='inputSoluzioneTicket' as='textarea' rows={4} id='soluzione' name='soluzione' onChange={this.onChangeSoluzione} placeholder='Inserisci una soluzione' />
                </Form.Group>
              </Row>

              <Button className='bottone' type='submit'>Risolvi</Button>
            </Form>
          </Card>
        </div>
      )
    } else {
      if (this.props.obj.soluzione) {
        return (
          <div id='root'>
            <Card className='my-10 mx-auto col-xl-7 justify-content-center text-center'>
              <h1>Ticket selezionato</h1><br />
              <h6>{this.props.obj.email}</h6>
              <h6>{moment(this.props.obj.date).format('DD MMM, YYYY')}</h6>
              <h3 className='mt-5'>{this.props.obj.titolo}</h3>
              <h5>{this.props.obj.problema}</h5>

              <h5 className='mt-5'><b>Soluzione</b></h5>
              <h5 className='mt-2'>{this.props.obj.soluzione}</h5>

            </Card>
          </div>
        )
      } else {
        return (
          <div id='root'>
            <Card className='my-10 mx-auto col-xl-7 justify-content-center text-center'>
              <h1>Ticket selezionato</h1><br />
              <h6>{this.props.obj.email}</h6>
              <h6>{moment(this.props.obj.date).format('DD MMM, YYYY')}</h6>
              <h3 className='mt-5'>{this.props.obj.titolo}</h3>
              <h5>{this.props.obj.problema}</h5>
            </Card>
          </div>
        )
      }
    }
  }
}
