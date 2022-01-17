import React from "react";
import {Form, Button, Card} from "react-bootstrap";
import '../../../App.css';
import '../../styles/gestioneAutenticazione/login.css';
import axios from 'axios';
import {Component} from "react";
import Popup from "../App/successPopUp";
import {Redirect} from 'react-router-dom';

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

                    {/*<div class="wrapper">
                        <form action="#">
                            <div class="h5 font-weight-bold text-center mb-3">Registration</div>
                            <div class="form-group d-flex align-items-center">
                                <div class="icon"><span class="far fa-user"></span></div> <input autocomplete="off" type="text" class="form-control" placeholder="Name"></input>
                            </div>
                            <div class="form-group d-flex align-items-center">
                                <div class="icon"><span class="far fa-envelope"></span></div> <input autocomplete="off" type="email" class="form-control" placeholder="Email"></input>
                            </div>
                            <div class="form-group d-flex align-items-center">
                                <div class="icon"><span class="fas fa-phone"></span></div> <input autocomplete="off" type="tel" class="form-control" placeholder="Phone"></input>
                            </div>
                            <div class="form-group d-flex align-items-center">
                                <div class="icon"><span class="fas fa-map-marker-alt"></span></div> <input autocomplete="off" type="text" class="form-control" placeholder="City"></input>
                            </div>
                            <div class="form-group d-flex align-items-center">
                                <div class="icon"><span class="fas fa-key"></span></div> <input autocomplete="off" type="password" class="form-control" placeholder="Password"></input>
                                <div class="icon btn"><span class="fas fa-eye-slash"></span></div>
                            </div>
                            <div class="mb-2"> <label class="option">Remember me <input type="checkbox" checked></input> <span class="checkmark"></span> </label> </div>
                            <div class="btn btn-primary mb-3">Signup</div>
                            <div class="terms mb-2"> By clicking "Signup", you acknowledge that you have read the <a href="#">Privacy Policy</a> and agree to the <a href="#">Terms of Service</a>. </div>
                            <div class="connect border-bottom mt-4 mb-4"></div>
                            <ul class="p-0 social-links">
                                <li><a href="#"><span class="fab fa-facebook-f"></span></a></li>
                                <li><a href="#"><span class="fab fa-google"></span></a></li>
                                <li><a href="#"><span class="fab fa-github"></span></a></li>
                            </ul>
                        </form>
                    </div>*/}
                    <Card className=" mx-auto col-xl-7 justify-content-center text-center position-inherit">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                                <div className="login">

                                    <h1>LOGIN</h1>
                                    <Form className="test" onSubmit={this.handleSubmit}>
                                        <br/>
                                        <div id="email">
                                            <Form.Label className="label">Email</Form.Label>
                                            <Form.Control id="email" className="control" type="text" name="email"
                                                          onChange={this.onChangeEmail}
                                                          placeholder="Inserisci la tua email"/>
                                        </div>
                                        <div id="password">
                                            <Form.Label className="label">Password</Form.Label>
                                            <Form.Control id="password" className="control" type="password"
                                                          name="password" onChange={this.onChangePassword}
                                                          placeholder="Inserisci la tua password"/>
                                        </div>
                                        <Button className="bottoneLogin position-inherit" variant="primary" type="submit" >
                                            LOGIN
                                        </Button>
                                    </Form>


                                </div>
                            </div>
                        </div>
                        </Card>
                </div>
            )

    }
}

