import React from "react";
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import '../App.css';
import './icss/login.css';
import {axios} from 'axios';
import { Component } from "react";

export default class Login extends Component{
   
    constructor(props){
        super(props);
  
        this.state={
            utente:{},
            inputPassword:'',
            inputOldPassword:'',
            inputConfirmPassword:''
        }
        this.onChangeinputPassword=this.onChangeinputPassword.bind(this);
        this.inputOldPassword=this.onChangeinputOldPassword.bind(this);
        this.inputConfirmPassword=this.onChangeConfirminputPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
  
    }
          
  
    onChangeinputPassword(e){
        this.setState({
            inputPassword: e.target.value
        })
    }
  
    onChangeinputOldPassword(e){
      this.setState({
          inputOldPassword: e.target.value
      })
    }
  
    onChangeConfirminputPassword(e){
      this.setState({
          inputConfirmPassword: e.target.value
      })
    }
  
    onSubmit(e){
        e.preventDefault();
        const newPsw={
        inputPassword: this.state.inputPassword,
        inputOldPassword: this.state.inputOldPassword,
        inputConfirmPassword: this.state.inputConfirmPassword,
    }
        console.log(newPsw);
        
        axios.post('http://localhost:3000/api/login/login',newPsw)
        .then(res=> console.log(res.data));
        window.location='/';
    }
  
  
  
    //se non è un cliente mostra il bottone "modifica inputPassword"
    render(){
        return(
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
        <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <div className="login">
        
            <Form className="test">
                <h3>LOGIN</h3><br></br>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Inserisci la tua email" />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Inserisci la tua password" />
                    </Form.Group>
                </Row>
                <br/>
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

