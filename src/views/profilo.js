import React,{Component} from 'react';
import "../App.css";
import {Card, Form} from 'react-bootstrap';
import axios from 'axios';
import './icss/profilo.css';


export default class Profilo extends Component{
  constructor(props){
      super(props);

      this.state={
          utente:{}
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
      <div>
        <h1>Ciao</h1>
        <h1>{this.state.utente.nome}</h1>

      </div>
  
  
    ) 
  }
}

