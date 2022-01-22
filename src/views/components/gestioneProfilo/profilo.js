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
                        <div className="row-block justify-content-center ">
                            {this.state.utente.map((oggetto)=> {
                             return(
                                <div className="cardProfile user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-25"> <img className="iconaUtente" src="https://img.icons8.com/bubbles/100/000000/under-computer.png" class="img-radius" alt="User-Profile-Image"></img> </div>
                                                <h6 class="f-w-600 text-uppercase">{oggetto.nome} {oggetto.cognome}</h6> <br></br>
                                                <h6 class="f-w-600 text-uppercase">Admin</h6><i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAZIONI PERSONALI</h5>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Email:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.email}</h6>
                                                        <p class="m-b-10 f-w-600">Nome:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.nome}</h6>
                                                        <p class="m-b-10 f-w-600">Cognome:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.cognome}</h6>
                                                    </div>

                                                </div>
                                                <Button className="bottone" href="/gestioneProfilo/modificaPassword" type="submit" >Modifica Password</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})
                            }
                    
                </div>
        </div>
        );
        } else if ((localStorage.getItem("ruolo")==="operatore mensa")||(localStorage.getItem("ruolo")==="personale adisu")){
            return(
                <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                    <div className="row-block justify-content-center">
                                {this.state.utente.map((oggetto) =>{
                                return(
                                    <div className="cardProfile user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-25"> <img className="iconaUtente" src="https://img.icons8.com/bubbles/100/000000/id-business-man-with-beard.png" class="img-radius" alt="User-Profile-Image"></img> </div>
                                                <h6 class="f-w-600 text-uppercase">{oggetto.nome} {oggetto.cognome}</h6><br></br>
                                                <h6 class="f-w-600 text-uppercase">{oggetto.ruolo}</h6><i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAZIONI ACCOUNT</h5>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Email:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.email}</h6>
                                                        <p class="m-b-10 f-w-600">Nome:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.nome}</h6>
                                                        <p class="m-b-10 f-w-600">Cognome:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.cognome}</h6>
                                                       
                                                    </div>

                                                </div><br></br>
                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAZIONI PERSONALI</h5>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Data di nascita:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.dataDiNascita}</h6>
                                                        <p class="m-b-10 f-w-600">Indirizzo:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.indirizzo}</h6>
                                                        <p class="m-b-10 f-w-600">Numero di telefono:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.numeroTelefono}</h6>
                                                    </div>

                                                </div>
                                                <Button className="bottone" href="/gestioneProfilo/modificaPassword" type="submit" >Modifica Password</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )})
                                }
                               
                    </div>
                </div>
            );
        } else if (localStorage.getItem("ruolo")==="cliente"){
            return(
                <div id="root">
                    <div className="row-block justify-content-center">
                            {this.state.utente.map((oggetto)=> {
                                return(
                                    <div className="cardProfile user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-25"> <img className="iconaUtente" src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"></img> </div>
                                                <h6 class="f-w-600 text-uppercase">{oggetto.nome} {oggetto.cognome}</h6><br></br>
                                                <h6 class="f-w-600 text-uppercase">Cliente</h6><i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAZIONI ACCOUNT</h5>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Email:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.email}</h6>
                                                        <p class="m-b-10 f-w-600">Nome:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.nome}</h6>
                                                        <p class="m-b-10 f-w-600">Cognome:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.cognome}</h6>
                                                        <p class="m-b-10 f-w-600">Numero di telefono:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.telefono}</h6>
                                                       
                                                    </div>

                                                </div><br></br>
                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAZIONI PERSONALI</h5>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Data di nascita:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.dataDiNascita}</h6>
                                                        <p class="m-b-10 f-w-600">Provincia di Nascita:</p>
                                                        <h6 class="text-muted f-w-400"> {oggetto.provinciaDiNascita}</h6>
                                                        <p class="m-b-10 f-w-600">Cittadinanza:</p>
                                                        <h6 class="text-muted f-w-400"> {oggetto.cittadinanza}</h6>
                                                    </div>

                                                </div>
                                                <br></br>
                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAZIONI ABITATIVE</h5>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Indirizzo:</p>
                                                        <h6 class="text-muted f-w-400">{oggetto.indirizzo}</h6>
                                                        <p class="m-b-10 f-w-600">Città:</p>
                                                        <h6 class="text-muted f-w-400"> {oggetto.citta}</h6>
                                                        <p class="m-b-10 f-w-600">Provincia:</p>
                                                        <h6 class="text-muted f-w-400"> {oggetto.provincia}</h6>
                                                        <p class="m-b-10 f-w-600">CAP:</p>
                                                        <h6 class="text-muted f-w-400"> {oggetto.cap}</h6>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                )
                            })}
                            
                    </div>
                </div>
            );
    }
}
}
//export default Profilo;
