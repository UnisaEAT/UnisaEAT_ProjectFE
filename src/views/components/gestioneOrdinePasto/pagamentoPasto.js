import React, { Component } from 'react'

import axios from 'axios'
import '../../styles/gestioneOrdinePasto/pagamentoPastoCSS.css'
import { Button } from 'react-bootstrap'
import Popup from '../App/successPopUp'

export default class PagamentoPasto extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ordine: [],
      prezzoTotale: 0,
      popUp: false,
      error: false

    }
    this.imageNameTextTransform = this.imageNameTextTransform.bind(this)
    this.onClickConfermaOrdine = this.onClickConfermaOrdine.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.errorHandlerSaldoInsufficiente = this.errorHandlerSaldoInsufficiente.bind(this)
    this.errorHandlerTesserino = this.errorHandlerTesserino.bind(this)
  }

  componentDidMount () {
    if (!localStorage.getItem('email') || !localStorage.getItem('ordine')) { this.setState({ error: 400 }) } else if (localStorage.getItem('ruolo') != 'cliente') { this.setState({ error: 401 }) } else {
      const ordine = JSON.parse(localStorage.getItem('ordine'))
      console.log(ordine)
      this.setState({ ordine: ordine.nomePiatti })
      this.setState({ prezzoTotale: ordine.prezzoTotale })
    }
  }

  closePopUp () {
    this.setState({ popUp: false })
    localStorage.removeItem('ordine')
    window.location.href = '/'
  }

  imageNameTextTransform (nomePasto) {
    return nomePasto.split(' ').join('_').toLowerCase()
  }

  errorHandlerSaldoInsufficiente () {
    const el = document.getElementsByClassName('pp-prezzoOrdineContainer')[0]
    const error = document.createElement('h4')
    error.textContent = 'Saldo del tesserino insufficiente'
    error.style = 'color:red'

    if (el.childNodes.length < 4) {
      el.appendChild(error)
    }
  }

  errorHandlerTesserino () {
    const el = document.getElementsByClassName('pp-prezzoOrdineContainer')[0]
    const error = document.createElement('h4')
    error.textContent = 'Non possiedi un tesserino'
    error.style = 'color:red'

    if (el.childNodes.length < 4) {
      el.appendChild(error)
    }
  }

  onClickConfermaOrdine () {
    const ordine = JSON.parse(localStorage.getItem('ordine'))

    const objOrdine = {
      email: localStorage.getItem('email'),
      prezzo: ordine.prezzoTotale,
      boolPranzo: ordine.boolPranzo,
      idPasti: ordine.idPiatti
    }

    axios.post('http://localhost:8080/api/ordine/create', objOrdine)
      .then(response => {
        console.log(response.data)
        if (response.data === true) {
          localStorage.removeItem('ordine')
          this.setState({ popUp: true })
        } else if (response.data.hasOwnProperty('error')) {
          if (response.data.error === 'Non possiedi un tesserino') { this.errorHandlerTesserino() } else { this.errorHandlerSaldoInsufficiente() }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    if (this.state.error === 400) { return <h1 className='erroreGenericoDiAccesso'>Effettua il login per accedere a questa pagina</h1> } else if (this.state.error === 401) { return <h1 className='erroreGenericoDiAccesso'>Accesso negato</h1> }
    let boolPranzo = 'Cena'
    if (this.state.ordine.boolPranzo) { boolPranzo = 'Pranzo' }
    return (
      <div className='pp-centralContainer'>
        {this.state.popUp && <Popup message='Recati nella pagina della lista degli ordini per visualizzare il QR code' handleClose={this.closePopUp} />}
        <div className='pp-centralContainerInner'>
          <div className='pp-riepilogoOrdine'>
            <h4>Riepilogo dell'ordine</h4>
            {
                        this.state.ordine.map((pasto, i) => {
                          return (
                            <div id={i} key={i} className='pp-pastoElement'>
                              <div className='pp-leftBlock'>
                                <div className='pp-insideBlockElement'>
                                  <div className='pp-elementTitle'>
                                    {pasto}
                                  </div>
                                </div>
                              </div>
                              <div className='pp-rightBlock'>
                                <img src={'../immaginiPasti/' + this.imageNameTextTransform(pasto) + '.jpg'} />
                              </div>
                            </div>
                          )
                        })
                    }
          </div>
          <div className='pp-pagamentoContainer'>
            <div className='pp-pagamentoContainerInner'>
              <h3>Pagamento</h3>
              <hr />
              <div className='pp-prezzoOrdineContainer'>
                <div className='d-flex justify-content-between'>
                  <span>Tipo menù</span>
                  <span>{boolPranzo}</span>
                </div>
                <div className='d-flex justify-content-between'>
                  <span className='pp-prezzoTotale'>TOTALE</span>
                  <span className='pp-prezzoTotale'>€ {this.state.prezzoTotale}</span>
                </div>
                <Button className='pp-buttonPagamento' onClick={this.onClickConfermaOrdine}>Conferma ordine</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
