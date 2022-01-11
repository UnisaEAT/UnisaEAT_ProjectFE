import React from 'react'
import "../../../App.css"
import {ListGroup, Button, Card, Row, Col} from "react-bootstrap";
import axios from "axios";
import RimozioneFAQ from "./rimozioneFAQ";
import ModificaFAQ from "./modificaFAQ";
import "../../styles/gestioneFAQ/FAQ.css"

export default class VisualizzazioneFAQ extends React.Component {
    //Costruttore di props
    constructor(props) {
        super(props);

        this.state = {
            faq: [],
            domanda: null
        }


        this.handleRimozioneFAQ = this.handleRimozioneFAQ.bind(this)
        this.handleModificaFAQ = this.handleModificaFAQ.bind(this)
    }

    componentDidMount() {
        axios.post("http://localhost:8080/api/faq/selectFAQ")
            .then(response => {
                console.log(response.data)
                this.setState({faq: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // Funzione che al click del bottone di rimozione crea l'oggetto da passare alla componente addetta alla rimozione come prop
    // settandolo come stato
    handleRimozioneFAQ(e, obj) {
        // oggetto da passare che contiene il personale da rimuovere

        this.setState({domanda: obj})
    }

    handleModificaFAQ(e, obj) {
        // oggetto da passare che contiene il personale da rimuovere

        this.setState({domanda: obj})
    }

    render() {

        // Solo se è stato settata la domanda da canc chiama l'altra componente e gli passa lo stato
        if (this.state.domanda != null) {
            console.log(this.state.domanda)
            //Invia il prop "obj" contente la domanda da rimuovere
            return (
            <><RimozioneFAQ obj={this.state.domanda} /><ModificaFAQ obj={this.state.domanda} /></>
            )
        }

        if(localStorage.getItem("ruolo")==="personale adisu"){ //se l'utente loggato è uno del personale può inserire, rimuovere e modificare faq 
            return (
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <h1 className="h1">Lista FAQ</h1>
                    <ListGroup as="ul">
                        {this.state.faq.map((oggetto, i) => {
                            return (
                                <Col key={i} as="li" className="d-flex justify-content-between align-items-start itemStyle">
                                <div className="ms-2 me-auto">
                                    <Row> <div className="fw-bold">Domanda:</div>{oggetto.domanda}</Row>  
                                    <Row> <div className="fw-bold">Risposta:</div>{oggetto.risposta}</Row>
                                </div>
                                <Button  href="/gestioneFAQ/rimozioneFAQ" onClick={(e) => {
                                    this.handleRimozioneFAQ(e, oggetto);}}>Rimuovi</Button>
                                
                                <Button href="/gestioneFAQ/modificaFAQ" onClick={(e) => {
                                    this.handleModificaFAQ(e, oggetto);}}>Modifica</Button>
                            </Col>
                            )
                        })}
                    </ListGroup>
                    <br></br>
                    <Button href="/gestioneFAQ/inserimentoFAQ">Inserisci una nuova faq</Button>
                </Card>
            )
        }
        else return(
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
            <h1 className="h1">Lista FAQ</h1>
            <br></br>
            <ListGroup as="ul">
                {this.state.faq.map((oggetto, i) => {
                    return (
                         <Col key={i} as="li" className="d-flex justify-content-between align-items-start itemStyle">
                            <div className="ms-2 me-auto">
                                <Row> <div className="fw-bold">Domanda:</div>  {oggetto.domanda} 
                                      <div className="fw-bold">Risposta:</div> {oggetto.risposta}</Row>  
                            
                            </div>
                        </Col>
                    )
                })}
            </ListGroup>
        </Card>

        )
    }
}