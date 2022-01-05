import React from "react";
import {Form,Button,Card} from "react-bootstrap";
import '../App.css';
import './icss/login.css';
import axios from 'axios';
import { Component } from "react";
import Popup from "../successPopUp";
import { Redirect } from 'react-router-dom';

export default class Login extends Component{
 
    constructor(props){
        super(props);
  
        this.state={
            email:'',
            password:'',
            ruolo:'',
            message:'',
            popUp:false,
            redirect:false,
        }
        this.onChangeEmail=this.onChangeEmail.bind(this)
        this.onChangePassword=this.onChangePassword.bind(this)
        this.submitForm=this.submitForm.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.errorRemoverOnChange=this.errorRemoverOnChange.bind(this)
       
    }
          
    closePopUp(){
        this.setState({popUp:false})
        console.log(this.state.popUp)
        this.setState({redirect:true})
        window.location = "/profilo"
    }

    // Handlers definition
    errorHandler(err){
        let inputError = err.name;
        let errorMessage = err.message;

        const rootElement = document.getElementById(inputError)

        if(rootElement.childNodes.length<3)
        {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    errorRemoverOnChange(e){
        let parent = document.getElementById(e.target.id);
        if(parent.childNodes.length>2)
            parent.removeChild(parent.lastElementChild)
    }

    onChangeEmail(e){
        this.errorRemoverOnChange(e)
        this.setState({
            email: e.target.value
        })
    }
  
    onChangePassword(e){
      this.errorRemoverOnChange(e)
      this.setState({
            password: e.target.value
      })
    }

    handleSubmit(e){
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const utente={
            email: this.state.email,
            password: this.state.password,
            ruolo:this.state.ruolo
        }
        this.submitForm(utente)
    }

    submitForm(utente){
       
        console.log(utente);
        axios.post('http://localhost:8080/api/login/login',utente)
        .then(response => {
            console.log(response.data)
            if(response.data.hasOwnProperty('message')){
                 this.setState({ message: response.data.message})
                 this.errorHandler(response.data)
            } 
            else{
                localStorage.setItem("email", utente.email)
                localStorage.setItem("ruolo", utente.ruolo)
                this.setState({popUp:true})
                
            }
            
        })
        .catch((err) => {
            
            console.log(err);
        })
        
    }
  
 
    render(){
        if(this.state.redirect){
            return( <Redirect to= '/profilo'/>) //mettere pagina Profilo
            
        }else
        return(
            <div id="root"> {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
            <Card className=" mx-auto col-xl-7 justify-content-center text-center position-inherit">
            <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="login">
               
                <h1>LOGIN</h1>
                <Form className="test" onSubmit={this.handleSubmit}>
                    <br/>
                    <div id="email">
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control id="email" className="control" type="text" name="email" onChange={this.onChangeEmail} placeholder="Inserisci la tua email"/>
                    </div>
                    <div id="password">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control id="password" className="control" type="password" name="password" onChange={this.onChangePassword} placeholder="Inserisci la tua password"/>
                    </div>
                    <Button className="bottone" variant="primary" type="submit">
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

