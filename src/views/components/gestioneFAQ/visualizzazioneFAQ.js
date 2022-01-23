import React from 'react'
import '../../../App.css'
import { ListGroup, Button, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Popup from '../App/successPopUp'
import ModificaFAQ from './modificaFAQ'
import '../../styles/gestioneFAQ/faqCSS.css'
export default class VisualizzazioneFAQ extends React.Component {
  // Costruttore di props
  constructor (props) {
    super(props)

    this.state = {
      faq: [],
      popUp: false,
      domanda: null,
      error: false
    }
    this.rimozioneFAQ = this.rimozioneFAQ.bind(this)
    this.handleModificaFAQ = this.handleModificaFAQ.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
  }

  closePopUp () {
    this.setState({ popUp: false })
    window.location.reload()
  }

  componentDidMount () {
    if (!localStorage.getItem('email')) { this.setState({ error: 400 }) } else if (localStorage.getItem('ruolo') == 'operatore mensa') { this.setState({ error: 401 }) } else {
      axios.post('http://localhost:8080/api/faq/selectFAQ')
        .then(response => {
          this.setState({ faq: response.data })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  rimozioneFAQ (obj) {
    // oggetto da passare che contiene la domanda da rimuovere

    axios.post('http://localhost:8080/api/faq/deleteFAQ', { domanda: obj.domanda })
      .then(response => {
        if (response.data.message === true) {
          this.setState({ popUp: true })
        } else if (response.data.name != null) { this.setState({ message: response.data.message }) }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleModificaFAQ (e, obj) {
    // oggetto da passare che contiene la FAQ da modificare

    this.setState({ domanda: obj })
  }

  render () {
    if (this.state.error === 400) { return <h1 className='erroreGenericoDiAccesso'>Effettua il login per accedere a questa pagina</h1> } else if (this.state.error === 401) { return <h1 className='erroreGenericoDiAccesso'>Accesso negato</h1> }
    // Solo se è stato settata la domanda da canc chiama l'altra componente e gli passa lo stato
    else if (this.state.domanda != null) {
      // Invia il prop "obj" contente la domanda da modificare
      return (
        <ModificaFAQ obj={this.state.domanda} />
      )
    }

    if (localStorage.getItem('ruolo') === 'personale adisu') { // se l'utente loggato è uno del personale può inserire, rimuovere e modificare faq
      return (
        <div id='root'>
          {/* Se popUp (boolean) è true */}
          {this.state.popUp && <Popup message='Rimozione avvenuta con successo!' handleClose={this.closePopUp} />}
          <Card className='faqContainer mx-auto col-xl-7 justify-content-center text-center'>
            <p>Frequently Asked Questions (FAQ)</p>
            <ListGroup as='ul'>
              {this.state.faq.map((oggetto, i) => {
                return (

                  <Col key={i} as='li' className='d-flex justify-content-between align-items-start itemStyle'>

                    <div className='sezioneFaq ms-2 me-auto'>
                      <div className='modificaFaqButtonContainer'>
                        <Button className='faqModificaButtons' onClick={() => this.rimozioneFAQ(oggetto)}>Rimuovi</Button>
                        <Button
                                className='faqModificaButtons' onClick={(e) => {
                                    this.handleModificaFAQ(e, oggetto)
                                  }}
                              >Modifica
                              </Button>
                      </div>
                      <Row>
                        <div className='faqDomanda fw-bold'>
                                <span className='FAQlabel'>Q.</span>
                                <span className='FAQinfo'>{oggetto.domanda}
                                  </span>
                              </div>
                      </Row>
                      <Row>
                        <div className='faqRisposta fw-bold'>
                                <span className='FAQlabel'>A.</span>
                                <span className='FAQinfo'>{oggetto.risposta}
                                  </span>
                              </div>
                      </Row>

                    </div>

                  </Col>
                )
              })}
            </ListGroup>
            <br />
            <Button className='inserisciFAQbutton' href='/gestioneFAQ/inserimentoFAQ'>Inserisci una nuova FAQ</Button>
          </Card>
        </div>
      )
    } else {
      return (
        <Card className='faqContainer mx-auto col-xl-7 justify-content-center text-center'>
          <p>Frequently Asked Questions (FAQ)</p>
          <br />
          <ListGroup as='ul'>
            {this.state.faq.map((oggetto, i) => {
              return (
                <Col key={i} as='li' className='d-flex justify-content-between align-items-start itemStyle'>
             <div className='sezioneFaq ms-2 me-auto'>
                  <Row>
                      <div className='faqDomanda fw-bold'>
                              <span className='FAQlabel'>Q.</span>
                              <span className='FAQinfo'>{oggetto.domanda}
                            </span>
                            </div>
                    </Row>
                  <Row>
                      <div className='faqRisposta fw-bold'>
                              <span className='FAQlabel'>A.</span>
                              <span className='FAQinfo'>{oggetto.risposta}
                            </span>
                            </div>
                    </Row>

                </div>
           </Col>
              )
            })}
          </ListGroup>
        </Card>

      )
    }
  }
}
