import React from "react";
import {Form,Button,Col,Row} from "react-bootstrap";

import './componentsCss/inserisciTesserinoCSS.css'

export function InserisciTesserino()
{
    return(
        <div className="formContainer container">
            <Form className="test" action="http://localhost:3000/api/tesserino/create" method="POST">
                <h3>Dati anagrafici</h3>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="nome" placeholder="Inserisci il tuo nome" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" name="cognome" placeholder="Inserisci il tuo cognome" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control type="date" name="dataDiNascita" placeholder="Inserisci il tuo nome" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Comune di nascita</Form.Label>
                        <Form.Control type="text" name="comuneDiNascita" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Cittadinanza</Form.Label>
                        <Form.Control type="text" name="cittadinanza"/>
                    </Form.Group>

                </Row>
                <br/>
                <h3>Residenza</h3>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Indirizzo</Form.Label>
                        <Form.Control type="text" name="indirizzo" placeholder="Inserisci il tuo indirizzo" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control type="text" name="provincia"/>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Comune</Form.Label>
                        <Form.Control type="text" name="comune" />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>CAP</Form.Label>
                        <Form.Control type="number" name="cap" />
                    </Form.Group>
                </Row>
                <br/>
                <h3>Recapiti</h3>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Cellulare</Form.Label>
                        <Form.Control type="number" name="telefono" placeholder="Inserisci il tuo numero di cellulare" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Inserisci la tua email" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Conferma email</Form.Label>
                        <Form.Control type="text" name="confermaEmail" placeholder="Reinserisci la tua email" />
                    </Form.Group>
                </Row>

                <Button className="submitButton" variant="primary" type="submit">
                    Richiedi tesserino
                </Button>
            </Form>
        </div>
    )
}

export default InserisciTesserino