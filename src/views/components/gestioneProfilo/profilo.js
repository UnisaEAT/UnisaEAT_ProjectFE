import React, {Component} from 'react';
import {Card, Row, Col, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import '../../styles/gestioneProfilo/profilo.css';
import { Redirect } from 'react-router-dom';
import Popup from "../App/successPopUp";

export default class Profilo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            utente: [],
            inputPassword: '',
            inputOldPassword: '',
            inputConfirmPassword: '',
            popUp: false 

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
        axios.post('http://localhost:8080/api/profilo/findByEmail', {email: localStorage.getItem("email"),
        ruolo: localStorage.getItem("ruolo")})
            .then(res => {
                    console.log(res.data) //controllo
                    this.setState({utente: res.data})
                   
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
            email: localStorage.getItem("email"),
            ruolo: localStorage.getItem("ruolo"),
            popUp: false
        }
        console.log("PASSWORD"+newPsw);
        this.submitForm(newPsw)
    }

    submitForm(newPsw) {
        console.log("PASSWORD"+newPsw);
        axios.post('http://localhost:8080/api/profilo/updatePassword', newPsw)
            .then(response => {
                console.log(response.data)
                if (response.data.hasOwnProperty('message')) {
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data.message)
                   
                } else {
                    this.setState({popUp: true})

                }
            })
            .catch((err) => {

                console.log(err);
            })

    }


    //Se non è un cliente mostra il bottone "modifica Password"
    render() {
        console.log(localStorage.getItem("ruolo"))
        //se non c'è nessun utente loggato ritorna alla pagina di login
        if(localStorage.getItem("email")===null){  return(<Redirect to='/login'/>)}

        else if (localStorage.getItem("ruolo")==="admin") {
            return(
                <div id="root">
                    {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                    <Card className=" mx-auto col-xl-7 justify-content-center text-center position inherit">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                                <div className="AreaPersonale">
                                    <h1>AREA PERSONALE</h1>

                                    {this.state.utente.map(function(oggetto) {
                                    return(
                                        <Col >
                                            <Row>Nome: {oggetto.nome}</Row>
                                            <Row>Cognome: {oggetto.cognome}</Row>
                                            <Row>Email: {oggetto.email}</Row>
                                        </Col>
                                    )})
                                    }
                                    <Form className="test" onSubmit={this.handleSubmit}>
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

                                        <Button className="bottone" variant="primary" type="submit" >
                                            Modifica Password
                                        </Button>
              
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        } else if ((localStorage.getItem("ruolo")==="operatore mensa")||(localStorage.getItem("ruolo")==="personale adisu")){
            return(
                <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <div className="AreaPersonale">
                            <h1>AREA PERSONALE</h1>
                                {this.state.utente.map(function(oggetto) {
                            
                                return(
                                    <Col>
                                        <Row>Nome: {oggetto.nome}</Row>
                                        <Row>Cognome: {oggetto.cognome}</Row>
                                        <Row>Email: {oggetto.email}</Row>
                                        <Row>Numero di telefono: {oggetto.numeroTelefono}</Row>
                                        <Row>Data di nascita: {oggetto.dataDiNascita}</Row>
                                        <Row>Ruolo: {oggetto.ruolo}</Row>
                                        <Row>Indirizzo: {oggetto.indirizzo}</Row>
                                    </Col>
                                )})
                                }
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
            );
        } else if (localStorage.getItem("ruolo")==="cliente"){
            return(
                <div id="root">
                 {/* Se popUp (boolean) è true */}
                 {this.state.popUp && <Popup message={'Modifica password effettuata!'} handleClose={this.closePopUp}/>}
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <div className="AreaPersonale">
                            <h1>AREA PERSONALE</h1>
                            {this.state.utente.map((oggetto,i)=> {
                                return(
                                   
                                <Col>
                                    <Row>Nome: {oggetto.nome}</Row>
                                    <Row>Cognome: {oggetto.cognome}</Row>
                                    <Row>Città: {oggetto.citta}</Row>
                                    <Row>Email: {oggetto.email}</Row>
                                    <Row>Indirizzo: {oggetto.indirizzo}</Row>
                                    <Row>Data di nascita: {oggetto.dataDiNascita}</Row>
                                    <Row>Provincia di nascita: {oggetto.provinciaDiNascita}</Row>
                                    <Row>Cittadinanza: {oggetto.cittadinanza}</Row>
                                    <Row>Provincia: {oggetto.provincia}</Row>
                                    <Row>CAP: {oggetto.cap}</Row>
                                    <Row>Numero di telefono: {oggetto.telefono}</Row>
                                    
                                </Col>
                                
                                )
                            })}
                            
                            </div>
                        </div>
                    </div>
                </Card>
                </div>
            );
    }
}
}
//export default Profilo;
