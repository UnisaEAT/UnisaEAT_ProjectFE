import React,{Component} from 'react';
import "../App.css";
import {Card, Row,Col,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import './icss/profilo.css';


 class Profilo extends Component{
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
  //se non è un cliente mostra il bottone "modifica password"
  render(){
    if(this.state.utente.Ruolo!=="Cliente"){
    return (
      <Card className=" mx-auto col-xl-7 justify-content-center text-center">
      <div className="row d-flex justify-content-center">
      <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
      <div className="AreaPersonale">
        <h1>AREA PERSONALE</h1>
        <Col>
          <Row>Nome {this.state.utente.Nome}</Row>
          <Row>Cognome {this.state.utente.Cognome}</Row>
          <Row>Email {this.state.utente.Email}</Row>
          <Row>Indirizzo {this.state.utente.Indirizzo}</Row>
          <Row>Password{this.state.utente.Password}</Row>
        </Col>
        <Form className="test" action="http://localhost:3000/api/profilo/updatePassword" method="POST">
          <br/>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Inserisci la tua password" />
          <Button className="bottone" variant="primary" type="submit">
          Modifica Password
          </Button>
        </Form>
      </div></div></div>
      </Card>
      )
      }else{
        return(
          <Card className=" mx-auto col-xl-7 justify-content-center text-center">
          <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="AreaPersonale">
            <h1>AREA PERSONALE</h1>
            <Col>
              <Row>Nome {this.state.utente.Nome}</Row>
              <Row>Cognome {this.state.utente.Cognome}</Row>
              <Row>Email {this.state.utente.Email}</Row>
              <Row>Indirizzo {this.state.utente.Indirizzo}</Row>
              <Row>Password{this.state.utente.Password}</Row>
            </Col>
            </div>
            </div>
            </div>
            </Card>
        )
      }   
  }
}
export default Profilo;

