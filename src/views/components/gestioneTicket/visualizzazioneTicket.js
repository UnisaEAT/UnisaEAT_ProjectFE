import React from 'react'
import "../../../App.css"
import {ListGroup, Button, Card, Row, Col} from "react-bootstrap";
import axios from "axios";
import RisoluzioneTicket from "./risoluzioneTicket";
import moment from 'moment'
import "../../styles/gestioneTicket/ticketCSS.css"

export default class VisualizzazioneTicket extends React.Component {
    //Costruttore di props
    constructor(props) {
        super(props);

        this.state = {
            ticket: [],
            one: null,
            error: false
        }
    }

    handleRisoluzioneTicket(e, obj) {
        // oggetto da passare che contiene il personale da rimuovere

        this.setState({one: obj})
    }

    componentDidMount() {

        if (!localStorage.getItem("email"))
            this.setState({error: 400})

        else if(localStorage.getItem("ruolo")==="admin") {

            axios.post("http://localhost:8080/api/ticket/select")
                .then(response => {
                    this.setState({ticket: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else
        {
            axios.post("http://localhost:8080/api/ticket/utente", {email: localStorage.getItem("email")})
                .then(response => {
                    this.setState({ticket: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    render() {
        if(this.state.error===400)
            return <h1 className="erroreGenericoDiAccesso">Effettua il login per accedere a questa pagina</h1>
        else if(this.state.error===401)
            return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>
         // Solo se è stato settata il titolo, chiama l'altra componente e gli passa lo stato
        else if (this.state.one!==null) {
            console.log(this.state.one)
            //Invia il prop "obj" contente il titolo del ticket da risolvere
           
            return (
                <RisoluzioneTicket obj={this.state.one} />
            )
        }
       else if(localStorage.getItem("ruolo")==="admin"){ //se l'utente loggato è un admin può visualizzare i ticket(cambiare in ===)
           if(this.state.ticket.length>0)
            return (

                <Card className="my-10 mx-auto col-xl-7 justify-content-center text-center ticketListContainer">
                    <h1 className="h1">Lista Ticket</h1>
                    <table className="lo-table mt-4">
                        <tbody>
                        <tr className="lo-rowInfo ticketTH">
                            <th>Titolo</th>
                            <th>Utente</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                        </tbody>
                        <tr className="lo-rowNoOp"><td></td></tr>
                        {this.state.ticket.map((oggetto, i) => {
                            return(
                            <tr key={i} className="lo-rowData ">
                                <td className="ticketTD">{oggetto.titolo}</td>
                                <td className="ticketTD">{oggetto.email}</td>
                                <td className="ticketTD">{moment(oggetto.date).format('DD MMM, YYYY')}</td>
                                <td className="gt-buttonTd">
                                    <Button className="lo-dettagliButton" onClick={(e) => {
                                        this.handleRisoluzioneTicket(e, oggetto);}}>Visualizza</Button>
                                </td>
                            </tr>
                            )

                        })}
                    </table>
                    <br></br>
                </Card>
            )
           else
               return(
                   <Card className="my-10 mx-auto col-xl-7 justify-content-center text-center ticketListContainer">
                       <h1 className="h1">Lista Ticket</h1>
                       <h3 className="mt-5">Nessun ticket disponibile</h3>
                       <br></br>
                   </Card>
               )
        }
        else if(this.state.ticket.length>0)
            return(
           <Card className="my-10 mx-auto col-xl-7 justify-content-center text-center ticketListContainer">
               <h1 className="h1">Lista Ticket</h1>
               <table className="lo-table mt-5 mb-5">
                   <tbody>
                   <tr className="lo-rowInfo ticketTH">
                       <th>Titolo</th>
                       <th>Data</th>
                       <th></th>
                   </tr>
                   </tbody>
                   <tr className="lo-rowNoOp"><td></td></tr>
                   {this.state.ticket.map((oggetto, i) => {
                       if(oggetto.email===localStorage.getItem("email")){
                           return(
                           <tr key={i} className="lo-rowData ">
                               <td className="ticketTDTitolo">{oggetto.titolo}</td>
                               <td className="ticketTD">{moment(oggetto.date).format('DD MMM, YYYY')}</td>
                               <td className="gt-buttonTd">
                                   <Button className="lo-dettagliButton" onClick={(e) => {
                                       this.handleRisoluzioneTicket(e, oggetto);}}>Visualizza</Button>
                               </td>
                           </tr>
                       )

                   }})}
               </table>
           </Card>
        )
        else
            return(
                <Card className="my-10 mx-auto col-xl-7 justify-content-center text-center ticketListContainer">
                    <h1 className="h1">Lista Ticket</h1>
                    <h3 className="mt-5">Nessun ticket inviato</h3>
                    <br></br>
                </Card>
            )
    }
}