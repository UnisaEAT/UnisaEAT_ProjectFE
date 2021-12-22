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
                        <Form.Label>Soldi</Form.Label>
                        <Form.Control type="number" name="soldi" placeholder="Inserisci il tuo nome" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il tuo cognome" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control type="date" placeholder="Inserisci il tuo nome" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Provincia di nascita</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Comune di nascita</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Cittadinanza</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                </Row>
                <br/>
                <h3>Residenza</h3>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Indirizzo</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il tuo indirizzo" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Comune</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>CAP</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                </Row>
                <br/>
                <h3>Recapiti</h3>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Cellulare</Form.Label>
                        <Form.Control type="number" placeholder="Inserisci il tuo numero di cellulare" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la tua email" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Conferma email</Form.Label>
                        <Form.Control type="text" placeholder="Reinserisci la tua email" />
                    </Form.Group>
                </Row>

                <Button className="submitButton" variant="primary" type="submit">
                    Invia richiesta
                </Button>
            </Form>
        </div>
    )
}

export default InserisciTesserino