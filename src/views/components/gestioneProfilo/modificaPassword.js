import React from 'react'
import { Form, Button, Card, Col, Row, FormGroup } from 'react-bootstrap'
import axios from 'axios'
import Popup from '../App/successPopUp'
import '../../styles/gestioneProfilo/profilo.css'

export default class ModificaPassword extends React.Component {
  // Costruttore di props
  constructor (props) {
    super(props)
    this.state = {
      inputPassword: '',
      inputOldPassword: '',
      inputConfirmPassword: '',
      popUp: false
    }
    this.onChangeinputPassword = this.onChangeinputPassword.bind(this)
    this.onChangeinputOldPassword = this.onChangeinputOldPassword.bind(this)
    this.onChangeConfirminputPassword = this.onChangeConfirminputPassword.bind(this)
    this.errorHandler = this.errorHandler.bind(this)
    this.errorRemoverOnChange = this.errorRemoverOnChange.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
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

  onChangeinputPassword (e) {
    this.errorRemoverOnChange(e)
    this.setState({
      inputPassword: e.target.value
    })
  }

  onChangeinputOldPassword (e) {
    this.errorRemoverOnChange(e)
    this.setState({
      inputOldPassword: e.target.value
    })
  }

  onChangeConfirminputPassword (e) {
    this.errorRemoverOnChange(e)
    this.setState({
      inputConfirmPassword: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    // Oggetto da passare con il POST al controller per la lettura dei campi del form
    const newPsw = {
      inputPassword: this.state.inputPassword,
      inputOldPassword: this.state.inputOldPassword,
      inputConfirmPassword: this.state.inputConfirmPassword,
      email: localStorage.getItem('email'),
      ruolo: localStorage.getItem('ruolo')
    }
    this.submitForm(newPsw)
  }

  submitForm (newPsw) {
    axios.post('http://localhost:8080/api/profilo/updatePassword', newPsw)
      .then(response => {
        if (response.data.message === 'Modifica password avvenuta con successo.') {
          this.setState({ popUp: true })
        } else if (response.data.name !== null) { this.setState({ message: response.data.message }) }
        this.errorHandler(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div id='root'>
        {/* Se popUp (boolean) è true */}
        {this.state.popUp && <Popup message='Modifica avvenuta con successo!' handleClose={this.closePopUp} />}

        <Card className='my-10 mx-auto col-xl-7 justify-content-center text-center'>
          <h1>Modifica Password</h1><br />
          <Form className='test' onSubmit={this.handleSubmit}>
            <br />
            <Row className='mb-3'>
              <FormGroup id='inputOldPassword' as={Row}>
                <Form.Label className='labelPassword label'>Vecchia Password</Form.Label>
                <Form.Control
                  type='password' name='inputOldPassword' id='inputOldPassword'
                  onChange={this.onChangeinputOldPassword} placeholder='Inserisci la tua vecchia Password'
                />
              </FormGroup>

              <FormGroup id='inputPassword' as={Row}>
                <Form.Label className='labelPassword label'>Nuova Password</Form.Label>
                <Form.Control
                  type='password' name='inputPassword' id='inputPassword'
                  onChange={this.onChangeinputPassword} placeholder='Inserisci la tua nuova Password'
                />
              </FormGroup>

              <FormGroup id='inputConfirmPassword' as={Row}>
                <Form.Label className='labelPassword label'>Conferma Nuova Password</Form.Label>
                <Form.Control
                  type='password' name='inputConfirmPassword' id='inputConfirmPassword'
                  onChange={this.onChangeConfirminputPassword} placeholder='Inserisci di nuovo la nuova Password'
                />
              </FormGroup>
            </Row>
            <Button className='bottone' variant='primary' type='submit'>
              Modifica Password
            </Button>

          </Form>
        </Card>
      </div>
    )
  }
}
