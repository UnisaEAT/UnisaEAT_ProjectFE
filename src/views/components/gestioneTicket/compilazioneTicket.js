import React from 'react'
import { Form, Button, Col, Row, Card } from 'react-bootstrap'
import axios from 'axios'
import Popup from '../App/successPopUp'

import '../../styles/gestioneTicket/ticketCSS.css'

export default class CompilazioneTicket extends React.Component {
  // Costruttore di props
  constructor (props) {
    super(props)

    this.state = {
      titolo: '',
      problema: '',
      popUp: false,
      error: false
    }

    // Handlers binding
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeTitolo = this.onChangeTitolo.bind(this)
    this.onChangeProblema = this.onChangeProblema.bind(this)
    this.errorHandler = this.errorHandler.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.errorRemoverOnChange = this.errorRemoverOnChange.bind(this)
  }

  componentDidMount () {
    if (!localStorage.getItem('email')) { this.setState({ error: 400 }) } else if (localStorage.getItem('ruolo') == 'admin') { this.setState({ error: 401 }) }
  }

  closePopUp () {
    this.setState({ popUp: false })
    window.location = '/gestioneTicket/visualizzazioneTicket'
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
  onChangeTitolo (e) {
    this.errorRemoverOnChange(e)
    this.setState({
      titolo: e.target.value
    })
  }

  onChangeProblema (e) {
    this.errorRemoverOnChange(e)
    this.setState({
      problema: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    // Oggetto da passare con il POST al controller per la lettura dei campi del form
    const Ticket = {
      titolo: this.state.titolo,
      problema: this.state.problema,
      email: localStorage.getItem('email'),
      ruolo: localStorage.getItem('ruolo')
    }

    this.submitInserimentoForm(Ticket)
  }

  // Invio dell'oggetto @param Ticket al metodo del Back-End con una POST
  submitInserimentoForm (Ticket) {
    console.log(Ticket)
    axios.post('http://localhost:8080/api/ticket/insert', Ticket)
      .then(response => {
        console.log(response.data)
        if (response.data.message === 'Compilazione del ticket avvenuta con successo') {
          this.setState({ popUp: true })
        } else if (response.data.message === false) {
          this.errorHandler({ name: 'errorTicket', message: 'Ticket già presente con questo titolo' })
        } else if (response.data.name != null) { this.setState({ message: response.data.message }) }
        this.errorHandler(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    if (this.state.error === 400) { return <h1 className='erroreGenericoDiAccesso'>Effettua il login per accedere a questa pagina</h1> } else if (this.state.error === 401) { return <h1 className='erroreGenericoDiAccesso'>Accesso negato</h1> }

    return (
      <div id='rootTicket'>
        {/* Se popUp (boolean) è true */}
        {this.state.popUp && <Popup message='Inserimento avvenuto con successo!' handleClose={this.closePopUp} />}

        <Card className='ticketContainer my-10 mx-auto col-xl-7 justify-content-center text-center'>
          <h1>Compila il Ticket</h1><br />
          <Form onSubmit={this.handleSubmit}>
            <Row className='mb-3'>
              <Form.Group className='mt-3' id='titolo' as={Row}>
                <Form.Label>Titolo</Form.Label>
                <Form.Control type='text' id='titolo' name='titolo' onChange={this.onChangeTitolo} placeholder='Inserisci il titolo' autoComplete="off" />
              </Form.Group>
              <br />
              <Form.Group id='problema' as={Row}>
                <Form.Label>Descrivici il problema riscontrato</Form.Label>
                <Form.Control as='textarea' rows={5} id='problema' name='problema' onChange={this.onChangeProblema} placeholder='Inserisci il problema riscontrato...' autoComplete="off" />
              </Form.Group>
            </Row>
            <Button className='bottone' variant='primary' type='submit'>INSERISCI</Button>
            <Form.Group id='errorTicket' as={Row}>
              <Form.Label />
              <Form.Label />
            </Form.Group>
          </Form>
        </Card>
      </div>
    )
  }
}
