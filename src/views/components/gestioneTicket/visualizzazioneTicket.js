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
        }
    }

    handleRisoluzioneTicket(e, obj) {
        // oggetto da passare che contiene il personale da rimuovere

        this.setState({one: obj})
    }

    componentDidMount() {
        axios.post("http://localhost:8080/api/ticket/select")
            .then(response => {
                console.log(response.data)
                this.setState({ticket: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
         // Solo se è stato settata il titolo, chiama l'altra componente e gli passa lo stato
         if (this.state.one!==null) {
            console.log(this.state.one)
            //Invia il prop "obj" contente il titolo del ticket da risolvere
           
            return (
                <RisoluzioneTicket obj={this.state.one} />
            )
        }
       if(localStorage.getItem("ruolo")==="admin"){ //se l'utente loggato è un admin può visualizzare i ticket(cambiare in ===)
            return (
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <h1 className="h1">Lista Ticket</h1>
                    <ListGroup as="ul">
                        {this.state.ticket.map((oggetto, i) => {
                            return (
                                <Col key={i} as="li" className="d-flex justify-content-between align-items-start itemStyle">
                                <div className="ms-2 me-auto">
                                    <Row> <div className="fw-bold">Titolo:</div>{oggetto.titolo}</Row>  
                                    <Row> <div className="fw-bold">Problema:</div>{oggetto.problema}</Row>
                                    <Row> <div className="fw-bold">Soluzione:</div>{oggetto.soluzione}</Row>
                                    <Row> <div className="fw-bold">Data:</div>{moment(oggetto.date).format('DD MMM, YYYY')}</Row>
                                    <Row> <div className="fw-bold">Email:</div>{oggetto.email}</Row>
                                </div>
                                <Button className="bottone" onClick={(e) => {
                            this.handleRisoluzioneTicket(e, oggetto);}}>Risolvi</Button>
                            </Col>
                            )
                        })}
                    </ListGroup>
                    <br></br>
                </Card>
            )
        }
        else return(
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
            <h1 className="h1">Lista Ticket</h1>
            <ListGroup as="ul">
                {this.state.ticket.map((oggetto, i) => {
                if(oggetto.email===localStorage.getItem("email")){ 
                    return (
                        <Col key={i} as="li" className="d-flex justify-content-between align-items-start itemStyle">
                        <div className="ms-2 me-auto">
                            <Row> <div className="fw-bold">Titolo:</div>{oggetto.titolo}</Row>  
                            <Row> <div className="fw-bold">Problema:</div>{oggetto.problema}</Row>
                            <Row> <div className="fw-bold">Soluzione:</div>{oggetto.soluzione}</Row>
                            <Row> <div className="fw-bold">Data:</div>{moment(oggetto.date).format('DD MMM, YYYY')}</Row>
                        </div>
                       
                        
                    </Col>
                    )
                    }else return( <h2></h2>)
                })}
            </ListGroup>
            <br></br>
            <Button className="bottone" href="/gestioneTicket/compilazioneTicket">Inserisci un nuovo ticket</Button>
        </Card>
        )
    }
}