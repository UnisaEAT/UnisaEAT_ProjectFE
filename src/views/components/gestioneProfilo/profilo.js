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
                    <Card className=" mx-auto col-xl-7 justify-content-center text-center position inherit">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                                <div className="AreaPersonale">
                                    <h1>AREA PERSONALE</h1>

                                    {this.state.utente.map((oggetto)=> {
                                    return(
                                        <Col >
                                            <Row>Nome: {oggetto.nome}</Row>
                                            <Row>Cognome: {oggetto.cognome}</Row>
                                            <Row>Email: {oggetto.email}</Row>
                                            <Button href="/gestioneProfilo/modificaPassword" type="submit" >Modifica</Button>
                                        </Col>
                                    )})
                                    }
                                
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        } else if ((localStorage.getItem("ruolo")==="operatore mensa")||(localStorage.getItem("ruolo")==="personale adisu")){
            return(
                <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <div className="AreaPersonale">
                            <h1>AREA PERSONALE</h1>
                                {this.state.utente.map((oggetto) =>{
                                return(
                                    <Col>
                                        <Row>Nome: {oggetto.nome}</Row>
                                        <Row>Cognome: {oggetto.cognome}</Row>
                                        <Row>Email: {oggetto.email}</Row>
                                        <Row>Numero di telefono: {oggetto.numeroTelefono}</Row>
                                        <Row>Data di nascita: {oggetto.dataDiNascita}</Row>
                                        <Row>Ruolo: {oggetto.ruolo}</Row>
                                        <Row>Indirizzo: {oggetto.indirizzo}</Row>
                                        <Button href="/gestioneProfilo/modificaPassword" type="submit" >Modifica</Button>
                                    </Col>
                                     
                                )})
                                }
                               
                            </div>
                        </div>
                    </div>
                </Card>
                </div>
            );
        } else if (localStorage.getItem("ruolo")==="cliente"){
            return(
                <div id="root">
                 {/* Se popUp (boolean) è true */}
                 {this.state.popUp && <Popup message={'Modifica password effettuata!'} handleClose={this.closePopUp}/>}
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <div className="AreaPersonale">
                            <h1>AREA PERSONALE</h1>
                            {this.state.utente.map((oggetto)=> {
                                return(
                                   
                                <Col>
                                    <Row>Nome: {oggetto.nome}</Row>
                                    <Row>Cognome: {oggetto.cognome}</Row>
                                    <Row>Città: {oggetto.citta}</Row>
                                    <Row>Email: {oggetto.email}</Row>
                                    <Row>Indirizzo: {oggetto.indirizzo}</Row>
                                    <Row>Data di nascita: {oggetto.dataDiNascita}</Row>
                                    <Row>Provincia di nascita: {oggetto.provinciaDiNascita}</Row>
                                    <Row>Cittadinanza: {oggetto.cittadinanza}</Row>
                                    <Row>Provincia: {oggetto.provincia}</Row>
                                    <Row>CAP: {oggetto.cap}</Row>
                                    <Row>Numero di telefono: {oggetto.telefono}</Row>
                                    
                                </Col>
                                
                                )
                            })}
                            
                            </div>
                        </div>
                    </div>
                </Card>
                </div>
            );
    }
}
}
//export default Profilo;
