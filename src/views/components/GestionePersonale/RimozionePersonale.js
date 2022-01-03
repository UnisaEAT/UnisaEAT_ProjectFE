import React from 'react'
import "../../../App.css"
import {Card} from "react-bootstrap";
export default class RimozionePersonale extends React.Component{

    constructor(props) {
        super(props);

    }

    //Inseririre post per la rimozione che prende i campi di props.obj

    render() {
        return (
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                <h1 className="h1">Informazioni di {this.props.obj.nome} {this.props.obj.cognome}</h1>
                <Card className="align" style={{width: 'auto'}}>
                    <Card.Body>
                        <Card.Title>{this.props.obj.email}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text>
                        </Card.Text>
                        <form action="http://localhost:3000/api/personale/remove" method="POST">
                            <button type="submit" className="btn-block btn-primary">Rimuovi</button>
                        </form>
                    </Card.Body>
                </Card>
            </Card>
        )
    }
}
