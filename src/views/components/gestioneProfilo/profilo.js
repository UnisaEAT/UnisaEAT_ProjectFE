import React, {Component} from 'react';
import {Card, Row, Col, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import '../../styles/gestioneProfilo/profilo.css';
import Popup from "../App/successPopUp";
import { Redirect } from 'react-router-dom';

export default class Profilo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            utente: {},
            /*nome:'',
            cognome:'',
            email:'',
            password:'',
            citta:'',
            indirizzo:'',
            dataDiNascita:'',
            provinciaDiNascita:'',
            cittadinanza:'',
            provincia:'',
            cap:'',
            telefono:'',*/
            inputPassword: '',
            inputOldPassword: '',
            inputConfirmPassword: '',
            popUp: false //mettere false dopo

        }
        this.onChangeinputPassword = this.onChangeinputPassword.bind(this);
        this.onChangeinputOldPassword = this.onChangeinputOldPassword.bind(this);
        this.onChangeConfirminputPassword = this.onChangeConfirminputPassword.bind(this);
        this.submitForm = this.submitForm.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    closePopUp() {
        this.setState({popUp: false})
        console.log(this.state.popUp)
        window.location.reload(false);
    }

    // Handlers definition
    errorHandler(error) {
        let inputError = error.input;
        let errorMessage = error.message;

        console.log(inputError)
        const rootElement = document.getElementById(inputError)

        if (rootElement.childNodes.length < 3) {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    errorRemoverOnChange(e) {
        let parent = document.getElementById(e.target.id);
        if (parent.childNodes.length > 2)
            parent.removeChild(parent.lastElementChild)
    }

    componentDidMount() {
        console.log(localStorage.getItem("ruolo"))
        axios.post('http://localhost:8080/api/profilo/findByEmail', {email: localStorage.getItem("email"),
        ruolo: localStorage.getItem("ruolo")})
            .then(res => {
                    console.log(res.data.nome) //controllo
                    this.setState({nome: res.data.nome})
                    console.log(this.utente.nome+" ciao")
                })

            .catch( (error) => {
                console.log(error);
            })


    }

    onChangeinputPassword(e) {
        this.setState({
            inputPassword: e.target.value
        })
    }

    onChangeinputOldPassword(e) {
        this.setState({
            inputOldPassword: e.target.value
        })
    }

    onChangeConfirminputPassword(e) {
        this.setState({
            inputConfirmPassword: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const newPsw = {
            inputPassword: this.state.inputPassword,
            inputOldPassword: this.state.inputOldPassword,
            inputConfirmPassword: this.state.inputConfirmPassword,
        }
        this.submitForm(newPsw)
    }

    submitForm(newPsw) {
        
        console.log(newPsw);
        axios.post('http://localhost:3000/api/profilo/updatePassword', newPsw)
            .then(response => {
                if (response.data.hasOwnProperty('message')) {
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
                } else {
                    this.setState({popUp: true})

                }

            })
            .catch((err) => {

                console.log(err);
            })

    }


    //se non è un cliente mostra il bottone "modifica Password"
    render() {
       
        if(localStorage.getItem("email")===null){  return(<Redirect to='/login'/>)}
        else if (localStorage.getItem("ruolo")=== "admin") {
            console.log("ciao "+this.state.utente.nome)
            return (
                
                <div id="root">
                    {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                    <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                                <div className="AreaPersonale">
                                    <h1>AREA PERSONALE</h1>
                                    
                                    <Col>
                                        <Row>Nome: {this.state.utente.nome}</Row>
                                        <Row>Cognome: {this.state.utente.cognome}</Row>
                                        <Row>Email: {this.state.utente.email}</Row>
                                    </Col>

                                    <Form className="test" onSubmit={this.submitForm}>
                                        <br/>
                                        <div id="inputOldPassword">
                                            <Form.Label className="label">Vecchia Password</Form.Label>
                                            <Form.Control className="control" type="password" name="inputOldPassword"
                                                          id="inputOldPassword" onChange={this.onChangeinputOldPassword}
                                                          placeholder="Inserisci la tua vecchia assword"/>
                                        </div>

                                        <div id="inputPassword">
                                            <Form.Label className="label">Nuova Password</Form.Label>
                                            <Form.Control className="control" type="password" name="inputPassword"
                                                          id="inputPassword" onChange={this.onChangeinputPassword}
                                                          placeholder="Inserisci la tua nuova Password"/>
                                        </div>

                                        <div id="inputConfirmPassword">
                                            <Form.Label className="label">Conferma Nuova Password</Form.Label>
                                            <Form.Control className="control" type="password"
                                                          name="inputConfirmPassword" id="inputConfirmPassword"
                                                          onChange={this.onChangeConfirminputPassword}
                                                          placeholder="Inserisci di nuovo la nuova Password"/>
                                        </div>

                                        <Button className="bottone" variant="primary" type="submit">
                                            Modifica Password
                                        </Button>
              
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )
        } else if (localStorage.getItem("ruolo")=== "personale"){
           
            return (
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <div className="AreaPersonale">
                                <h1>AREA PERSONALE</h1>
                                <Col>
                                    <Row>Nome {this.state.utente.nome}</Row>
                                    <Row>Cognome {this.state.utente.cognome}</Row>
                                    <Row>Email {this.state.utente.email}</Row>
                                    <Row>Numero di telefono{this.state.utente.numeroTelefono}</Row>
                                    <Row>Data di nascita {this.state.utente.dataDiNascita}</Row>
                                    <Row>Ruolo{this.state.utente.ruolo}</Row>
                                    <Row>Disponibilità {this.state.utente.disponibilita}</Row>
                                    <Row>Indirizzo {this.state.utente.indirizzo}</Row>
                                </Col>

                                <Form className="test" onSubmit={this.submitForm}>
                                        <br/>
                                        <div id="inputOldPassword">
                                            <Form.Label className="label">Vecchia Password</Form.Label>
                                            <Form.Control className="control" type="password" name="inputOldPassword"
                                                          id="inputOldPassword" onChange={this.onChangeinputOldPassword}
                                                          placeholder="Inserisci la tua vecchia assword"/>
                                        </div>

                                        <div id="inputPassword">
                                            <Form.Label className="label">Nuova Password</Form.Label>
                                            <Form.Control className="control" type="password" name="inputPassword"
                                                          id="inputPassword" onChange={this.onChangeinputPassword}
                                                          placeholder="Inserisci la tua nuova Password"/>
                                        </div>

                                        <div id="inputConfirmPassword">
                                            <Form.Label className="label">Conferma Nuova Password</Form.Label>
                                            <Form.Control className="control" type="password"
                                                          name="inputConfirmPassword" id="inputConfirmPassword"
                                                          onChange={this.onChangeConfirminputPassword}
                                                          placeholder="Inserisci di nuovo la nuova Password"/>
                                        </div>

                                        <Button className="bottone" variant="primary" type="submit">
                                            Modifica Password
                                        </Button>

                                    </Form>
                            </div>
                        </div>
                    </div>
                </Card>
                
            )
        } else if (localStorage.getItem("ruolo")=== "cliente"){
            return (
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <div className="AreaPersonale">
                                <h1>AREA PERSONALE</h1>
                                <Col>
                                    <Row>Nome {this.state.utente.nome}</Row>
                                    <Row>Cognome {this.state.utente.cognome}</Row>
                                    <Row>Città {this.state.utente.citta}</Row>
                                    <Row>Email {this.state.utente.email}</Row>
                                    <Row>Indirizzo {this.state.utente.indirizzo}</Row>ù
                                    <Row>Data di nascita {this.state.utente.dataDiNascita}</Row>
                                    <Row>Provincia di nascita {this.state.utente.provinciaDiNascita}</Row>
                                    <Row>Comune di nascita {this.state.utente.comuneDiNascita}</Row>
                                    <Row>Cittadinanza {this.state.utente.cittadinanza}</Row>
                                    <Row>Provincia{this.state.utente.provincia}</Row>
                                    <Row>CAP{this.state.utente.cap}</Row>
                                    <Row>Numero di telefono{this.state.utente.numeroTelefono}</Row>
                                    
                                </Col>
                            </div>
                        </div>
                    </div>
                </Card>
                
            )
    }
}
}
//export default Profilo;
