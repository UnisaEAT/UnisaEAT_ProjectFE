import React from 'react'
import "../../../App.css"
import {Card} from "react-bootstrap";
export function RimozionePersonale () {
    return(
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                        <h1 className="h1">Informazioni "nome personale"</h1>
                        <Card className="align" style={{ width: 'auto' }}>
                            <Card.Body>
                                <Card.Title>Nome e cognome personale</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Email personale</Card.Subtitle>
                                <Card.Text>
                                    Il personale in questione...
                                </Card.Text>
                                <form action="http://localhost:3000/api/personale/remove" method="POST">
                                <button type="submit" className="btn-block btn-primary">Rimuovi</button>
                                </form>
                            </Card.Body>
                        </Card>
        </Card>
    )
}
export default RimozionePersonale