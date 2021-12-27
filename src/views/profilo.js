import React,{Component} from 'react';
import "../App.css";
import {Card, Row,Col,Form,Button} from 'react-bootstrap';
import axios from 'axios';
import './icss/profilo.css';


 export default class Profilo extends Component{
   
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
        
  componentDidMount() {
      axios.get('http://localhost:8080/api/profilo/findByEmail')
        .then(response => {
    
          this.setState({
            utente:response.data
          })   
        }
        )

        .catch(function (error) {
          console.log(error);
        })

       
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
      
      axios.post('http://localhost:8080/api/profilo/updateinputPassword',newPsw)
      .then(res=> console.log(res.data));
      window.location='/';
  }



  //se non è un cliente mostra il bottone "modifica inputPassword"
  render(){
      if(this.state.utente.ruolo!=="Cliente"){
        return (
          <Card className=" mx-auto col-xl-7 justify-content-center text-center">
          <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="AreaPersonale">
            <h1>AREA PERSONALE</h1>
            <Col>
              <Row>Nome: {this.state.utente.nome}</Row>
              <Row>Cognome: {this.state.utente.cognome}</Row>
              <Row>Email: {this.state.utente.email}</Row>
              <Row>Indirizzo: {this.state.utente.indirizzo}</Row>
            </Col>
            <Form className="test" onSubmit={this.onSubmit}>
              <br/>
              <Form.Label className="label">Vecchia Password</Form.Label>
              <Form.Control className="control" type="inputPassword" name="inputOldPassword" onChange={this.onChangeinputOldPassword} placeholder="Inserisci la tua vecchia inputPassword"/>

              <Form.Label className="label">Nuova Password</Form.Label>
              <Form.Control className="control" type="inputPassword" name="inputPassword" onChange={this.onChangeinputPassword} placeholder="Inserisci la tua nuova inputPassword"/>

              <Form.Label className="label">Conferma Nuova Password</Form.Label>
              <Form.Control className="control" type="inputPassword" name="inputConfirmPassword" onChange={this.onChangeConfirminputPassword} placeholder="Inserisci di nuovo la nuova inputPassword"/>

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
                  <Row>Nome {this.state.utente.nome}</Row>
                  <Row>Cognome {this.state.utente.nognome}</Row>
                  <Row>Email {this.state.utente.email}</Row>
                  <Row>Indirizzo {this.state.utente.indirizzo}</Row>
                </Col>
                </div>
                </div>
                </div>
                </Card>
            )
          }   
  }
}
//export default Profilo;

