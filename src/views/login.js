import React from "react";
import {Form,Button,Card} from "react-bootstrap";
import '../App.css';
import './icss/login.css';
import axios from 'axios';
import { Component } from "react";


export default class Login extends Component{
   
    
    constructor(props){
        super(props);
  
        this.state={
            email:'',
            password:'',
            message:''
        }
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
  
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
  
    onSubmit(e){
        e.preventDefault();
        const utente={
            email: this.state.email,
            password: this.state.password,
        }
        console.log(utente);
        axios.post('http://localhost:8080/api/login/login', utente)
        .then(response => {
            this.setState({ message: response.data.message })
            console.log(this.state.message)
        })
        .catch((error) => {
            console.log(error);
        })
    }
  
  
    render(){
       
        return(
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
        <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <div className="login">
            <h1>LOGIN</h1>
            <Form className="test" onSubmit={this.onSubmit}>
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
        </Card>
        )
    }
  }

