import React,{Component} from 'react';
import "../App.css";
import {Card, Form} from 'react-bootstrap';
import axios from 'axios';
import './icss/profilo.css';


export default class Profilo extends Component{
        constructor(props){
            super(props);

            this.state={
                utente:null,
            }
        }
        
        componentDidMount() {
            axios.get('http://localhost:8080/api/profilo/findByEmail')
              .then(response => {
                this.setState({
                  utente:response.data
                })   
              })
              .catch(function (error) {
                console.log(error);
              })
        
      }
     
     render(){
     return (
      <Card className=" mx-auto col-xl-7 justify-content-center text-center">
            <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        
            
            <label>Nome: </label> 
            <h1>{this.state.utente.nome}</h1>
            <div><label>Cognome: </label></div>
            <div><label>Indirizzo: </label></div>
            <div><label>Email: </label></div>
            
            <Form className="profilo" action="http://localhost:3000/api/profilo/updatePassword" method="POST">
                <div><label>Modifica Password: </label></div>
                <div>
                    <input type="bottone" name="Password"/>
                </div>
            </Form>
      
            </div>    
            </div>
             
      </Card>
  )
  }
}

