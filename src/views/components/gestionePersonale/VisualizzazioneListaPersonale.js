import React from 'react'
import "../../../App.css"
import {ListGroup, Button, Card, Image} from "react-bootstrap";
import axios from "axios";
import RimozionePersonale from "./RimozionePersonale";

export default class VisualizzazioneListaPersonale extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            utente: [],
            error:false,
            personale: null
        }


        this.handleRimozionePersonale = this.handleRimozionePersonale.bind(this)
    }

    componentDidMount() {
        if(!localStorage.getItem("email"))
            this.setState({error:400})
        else if(localStorage.getItem("ruolo")!="admin" && localStorage.getItem("ruolo")!="personale adisu")
            this.setState({error:401})
        else {
            axios.post("http://localhost:8080/api/personale/viewLista", {ruolo: localStorage.getItem("ruolo")})
                .then(response => {
                    console.log(response.data)
                    this.setState({utente: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    // Funzione che al click del bottone di rimozione crea l'oggetto da passare alla componente addetta alla rimozione come prop
    // settandolo come stato
    handleRimozionePersonale(e, obj) {
        // oggetto da passare che contiene il personale da rimuovere

        this.setState({personale: obj})
    }


    render() {

        // Solo se è stato settato l'utente da cancellare chiama l'altra componente e gli passa lo stato
        if (this.state.personale != null) {
            console.log(this.state.personale)
            //Invia il prop "obj" contente il personale da rimuovere
            return (<RimozionePersonale obj={this.state.personale}/>)
        }
        if(this.state.error===400)
            return <h1 className="erroreGenericoDiAccesso">Effettua il login per accedere a questa pagina</h1>
        else if(this.state.error===401)
            return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>
        return (
            <div className="my-10">
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                <h1 className="h1">Lista Operatori</h1>
                <ListGroup as="ul">
                    {this.state.utente.map((oggetto, i) => {
                        return (
                            <ListGroup.Item key={i} as="li"
                                            className="d-flex justify-content-between align-items-start itemStyle">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{oggetto.nome} {oggetto.cognome}</div>
                                    <p>{oggetto.email}</p>
                                </div>
                                <Button onClick={(e) => {
                                    this.handleRimozionePersonale(e, oggetto);
                                }} className="buttonStyle" variant="light" pill>
                                    <Image src="https://image.flaticon.com/icons/png/512/61/61403.png"
                                           width="35"/>
                                </Button>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
                <Button href="/gestionePersonale/InserimentoPersonale" className="btn-block btn-primary">Inserisci un nuovo
                    membro</Button>
            </Card>
            </div>
        )
    }
}