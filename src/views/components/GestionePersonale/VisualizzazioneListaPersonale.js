import React from 'react'
import "../../../App.css"
import {ListGroup, Image, Button, Card} from "react-bootstrap";
import axios from "axios";


export default class VisualizzazioneListaPersonale extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            utente: []
    }
    }
    componentDidMount() {
        axios.get("http://localhost:3000/api/personale/viewLista")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        utente: response.data,
                    })

                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

 render() {
    return (
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                        <h1 className="h1">Lista Operatori</h1>
            <ListGroup as="ul">

                            {this.state.utente.map(function (oggetto, i) {
                                return (

                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start itemStyle"
                                    >
                                        <div className="ms-2 me-auto">
                                    <div className="fw-bold" key={i}> {oggetto.nome} {oggetto.cognome}</div>
                                    <p key={i}> {oggetto.email}</p>
                                    </div>
                                        <Button href="/RimozionePersonale" className="buttonStyle" variant="light" pill>
                                            <Image src="https://image.flaticon.com/icons/png/512/61/61403.png"
                                                   width="35"/>
                                        </Button>
                                    </ListGroup.Item>
                                )
                        })}

            </ListGroup>
                <Button href="/InserimentoPersonale" className="btn-block btn-primary" >Inserisci un nuovo membro</Button>
            </Card>
    )
}
}
