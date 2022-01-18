import React from "react";
import {Form, Button, Card,Image} from "react-bootstrap";
import '../../../App.css';
import '../../styles/gestioneAutenticazione/login.css';
import axios from 'axios';
import {Component} from "react";
import Popup from "../App/successPopUp";
import {Redirect} from 'react-router-dom';
import logoMail from "../../assets/email.png"
import logoPsw from "../../assets/key.png"

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            ruolo: '',
            message: '',
            popUp: false,
            redirect: false,
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.errorRemoverOnChange = this.errorRemoverOnChange.bind(this)

    }

    closePopUp() {
        this.setState({popUp: false})
        console.log(this.state.popUp)
        this.setState({redirect: true})
        window.location = "/gestioneProfilo/profilo"
    }

    // Handlers definition
    errorHandler(err) {
        let inputError = err.name;
        let errorMessage = err.message;

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

    onChangeEmail(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const utente = {
            email: this.state.email,
            password: this.state.password,
            ruolo: this.state.ruolo
        }
        this.submitForm(utente)
    }

    submitForm(utente) {

        console.log(utente);
        axios.post('http://localhost:8080/api/login/login', utente)
            .then(response => {
                console.log("response:" + response.data.message)
                if (response.data.hasOwnProperty('message')) {
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
                } else {
                    localStorage.setItem("email", response.data.email)
                    localStorage.setItem("ruolo", response.data.ruolo)
                    this.setState({popUp: true})

                }

            })
            .catch((err) => {

                console.log(err);
            })

    }


    render() {
        if (this.state.redirect) {
            return (<Redirect to='/gestioneProfilo/profilo'/>) 

        } else
            return (
                <div id="root">
                     {/* Se popUp (boolean) è true */}
                     {this.state.popUp && <Popup message={'Login effettuato!'} handleClose={this.closePopUp}/>}

                   <Card className="wrapper">
                                <div className="login h5 font-weight-bold text-center mb-3">
                                    <h1>LOGIN</h1>
                                    <Form className="test align-items-center" onSubmit={this.handleSubmit}>
                                        <br/>
                                        <div className="form-group align-items-center" id="email">
                                        <div class="icon"> <Image src={logoMail} width="30"/></div>
                                            <Form.Control id="email" className="form-control" type="text" name="email"
                                                          onChange={this.onChangeEmail}
                                                          placeholder="Inserisci la tua email"/>
                                        </div>
                                        <div className="form-group align-items-center" id="password">
                                        <div class="icon"> <Image src={logoPsw} width="30"/></div>
                                            <Form.Control id="password" className="form-control" type="password"
                                                          name="password" onChange={this.onChangePassword}
                                                          placeholder="Inserisci la tua password"/>
                                        </div>
                                        <Button className="bottoneLogin align-items-center"  type="submit" >
                                            LOGIN
                                        </Button>
                                    </Form>


                                </div>
                        </Card>
                </div>
            )

    }
}

