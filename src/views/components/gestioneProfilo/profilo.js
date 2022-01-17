import React, {Component} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import '../../styles/gestioneProfilo/profilo.css';
import { Redirect } from 'react-router-dom';
import Popup from "../App/successPopUp";

export default class Profilo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            utente: [],
            popUp: false 

        }
    }

    componentDidMount() {
        axios.post('http://localhost:8080/api/profilo/findByEmail', {email: localStorage.getItem("email"),
        ruolo: localStorage.getItem("ruolo")})
            .then(res => {
                    console.log(res.data) //controllo
                    this.setState({utente: res.data})
                   
                })

            .catch( (error) => {
                console.log(error);
            })


    }


    //Se non è un cliente mostra il bottone "modifica Password"
    render() {
        console.log(localStorage.getItem("ruolo"))
        //se non c'è nessun utente loggato ritorna alla pagina di login
        if(localStorage.getItem("email")===null){  return(<Redirect to='/login'/>)}

        else if (localStorage.getItem("ruolo")==="admin") {
            return(
                <div id="root">
                    {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                    <Card className="card-profilo mx-auto justify-content-center text-center position inherit">
                        <div className="row d-flex justify-content-center">
                                    <h1>AREA PERSONALE</h1>

                                    {this.state.utente.map((oggetto)=> {
                                    return(
                                        <Col >
                                            <Row className="righe">Nome: {oggetto.nome}</Row>
                                            <Row className="righe">Cognome: {oggetto.cognome}</Row>
                                            <Row className="righe">Email: {oggetto.email}</Row>
                                            <Button className="bottone" href="/gestioneProfilo/modificaPassword" type="submit" >Modifica Password</Button>
                                        </Col>
                                    )})
                                    }
                            
                        </div>
                    </Card>
                </div>
            );
        } else if ((localStorage.getItem("ruolo")==="operatore mensa")||(localStorage.getItem("ruolo")==="personale adisu")){
            return(
                <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                <Card className="card-profilo mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                            <h1>AREA PERSONALE</h1>
                                {this.state.utente.map((oggetto) =>{
                                return(
                                    <Col>
                                        <Row className="righe">Nome: {oggetto.nome}</Row>
                                        <Row className="righe">Cognome: {oggetto.cognome}</Row>
                                        <Row className="righe">Email: {oggetto.email}</Row>
                                        <Row className="righe">Numero di telefono: {oggetto.numeroTelefono}</Row>
                                        <Row className="righe">Data di nascita: {oggetto.dataDiNascita}</Row>
                                        <Row className="righe">Ruolo: {oggetto.ruolo}</Row>
                                        <Row className="righe">Indirizzo: {oggetto.indirizzo}</Row>
                                        <Button className="bottone" href="/gestioneProfilo/modificaPassword" type="submit" >Modifica Password</Button>
                                    </Col>
                                     
                                )})
                                }
                               
                    </div>
                </Card>
                </div>
            );
        } else if (localStorage.getItem("ruolo")==="cliente"){
            return(
                <div id="root">
                <Card className="card-profilo mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                            <h1>AREA PERSONALE</h1>
                            {this.state.utente.map((oggetto)=> {
                                return(
                                <Col>
                                    <Row className="righe">Nome: {oggetto.nome} </Row>
                                    <Row className="righe">Cognome: {oggetto.cognome}</Row>
                                    <Row className="righe">Città: {oggetto.citta}</Row>
                                    <Row className="righe">Email: {oggetto.email}</Row>
                                    <Row className="righe">Indirizzo: {oggetto.indirizzo}</Row>
                                    <Row className="righe">Data di nascita: {oggetto.dataDiNascita}</Row>
                                    <Row className="righe">Provincia di nascita: {oggetto.provinciaDiNascita}</Row>
                                    <Row className="righe">Cittadinanza: {oggetto.cittadinanza}</Row>
                                    <Row className="righe">Provincia: {oggetto.provincia}</Row>
                                    <Row className="righe">CAP: {oggetto.cap}</Row>
                                    <Row className="righe">Numero di telefono: {oggetto.telefono}</Row>
                                    
                                </Col>
                                
                                )
                            })}
                            
                    </div>
                </Card>
                </div>
            );
    }
}
}
//export default Profilo;
