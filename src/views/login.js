import React from "react";
import {Form,Button,Card} from "react-bootstrap";
import '../App.css';
import './icss/login.css';
import axios from 'axios';
import { Component } from "react";
import Popup from "../successPopUp";
import NavbarApp from "./navbar";



export default class Login extends Component{
 
    constructor(props){
        super(props);
  
        this.state={
            email:'',
            password:'',
            message:'',
        }
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
          
   

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
  
    onChangePassword(e){
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
        }
        this.submitForm(utente)
    }

    submitForm(utente){
       
        console.log(utente);
        axios.post('http://localhost:8080/api/login/login',utente)
        .then(response => {
            if(response.data===true){
                 window.location.reload(false);
                 this.setState({ message: response.data.message })

                 
            }    
        })
        .catch((err) => {
            
            console.log(err);
        })

        axios.get('http://localhost:8080/api/login/authChecker')
            .then(response=>{
                console.log(response.data.message)
                if(response.data.message=='Unauthorized')
                    return(
                        <NavbarApp utente={true}></NavbarApp>
        
                    )
                .catch((err) => {
                    console.log(err);
                })
                        
        })
    }
  
  
    render(){
        return(
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
        <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <div className="login">
            <div id="root"> {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
            <h1>LOGIN</h1>
            <Form className="test" onSubmit={this.handleSubmit}>
                <br/>
                <Form.Label className="label">Email</Form.Label>
                <Form.Control className="control" type="text" name="email" onChange={this.onChangeEmail} placeholder="Inserisci la tua email"/>
        
                <Form.Label className="label">Password</Form.Label>
                <Form.Control className="control" type="password" name="password" onChange={this.onChangePassword} placeholder="Inserisci la tua password"/>

                <Button className="bottone" variant="primary" type="submit">
                    LOGIN
                </Button>
            </Form>
           
            
        </div>
        </div>
        </div>
        </div>
        </Card>
        )
    }
  }

