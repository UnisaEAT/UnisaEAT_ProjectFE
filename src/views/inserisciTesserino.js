import React, {Component} from "react";
import {Form,Button,Col,Row} from "react-bootstrap";

import './componentsCss/inserisciTesserinoCSS.css'
import axios from "axios";

export default class InserisciTesserino extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            message: '',
            nome: '',
            cognome: '',
            dataDiNascita: '',
            comuneDiNascita: '',
            cittadinanza: '',
            indirizzo: '',
            provincia: '',
            comune: '',
            cap: '',
            cellulare: '',
            email: '',
            confermaEmail: ''
        }

        // Handlers binding
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeCognome = this.onChangeCognome.bind(this)
        this.onChangeDataDiNascita = this.onChangeDataDiNascita.bind(this)
        this.onChangeComuneDiNascita = this.onChangeComuneDiNascita.bind(this)
        this.onChangeCittadinanza = this.onChangeCittadinanza.bind(this)
        this.onChangeIndirizzo = this.onChangeIndirizzo.bind(this)
        this.onChangeProvincia = this.onChangeProvincia.bind(this)
        this.onChangeComune = this.onChangeComune.bind(this)
        this.onChangeCap = this.onChangeCap.bind(this)
        this.onChangeCellulare = this.onChangeCellulare.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeConfermaEmail = this.onChangeConfermaEmail.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    // Handlers definition
    onChangeNome(e)
    {
        this.setState({
            nome: e.target.value
        })
    }

    onChangeCognome(e)
    {
        this.setState({
            cognome: e.target.value
        })
    }

    onChangeDataDiNascita(e)
    {
        this.setState({
            dataDiNascita: e.target.value
        })
    }

    onChangeComuneDiNascita(e)
    {
        this.setState({
            comuneDiNascita: e.target.value
        })
    }

    onChangeCittadinanza(e)
    {
        this.setState({
            cittadinanza: e.target.value
        })
    }

    onChangeIndirizzo(e)
    {
        this.setState({
            indirizzo: e.target.value
        })
    }

    onChangeProvincia(e)
    {
        this.setState({
            provincia: e.target.value
        })
    }

    onChangeComune(e)
    {
        this.setState({
            comune: e.target.value
        })
    }

    onChangeCap(e)
    {
        this.setState({
            cap: e.target.value
        })
    }

    onChangeCellulare(e)
    {
        this.setState({
            cellulare: e.target.value
        })
    }

    onChangeEmail(e)
    {
        this.setState({
            email: e.target.value
        })
    }

    onChangeConfermaEmail(e)
    {
        this.setState({
            confermaEmail: e.target.value
        })
    }

    handleSubmit(e)
    {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const tesserino = {
            nome: this.state.nome,
            cognome: this.state.cognome,
            dataDiNascita: this.state.dataDiNascita,
            comuneDiNascita: this.state.comuneDiNascita,
            cittadinanza: this.state.cittadinanza,
            indirizzo: this.state.indirizzo,
            provincia: this.state.provincia,
            comune: this.state.comune,
            cap: this.state.cap,
            cellulare: this.state.cellulare,
            email: this.state.email,
            confermaEmail: this.state.confermaEmail,
        }

        this.submitForm(tesserino)
    }

    submitForm(tesserino)
    {
        axios.post('http://localhost:3000/api/tesserino/create', tesserino)
            .then(response => {
                this.setState({ message: response.data.message })
                console.log(this.state)
            })
            .catch((error) => {
                console.log(error);
            })
    }



    render() {
        return (
            <div className="formContainer container">
                {this.state.message}
                <Form onSubmit={this.handleSubmit}>
                    <h3>Dati anagrafici</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" name="nome" onChange={this.onChangeNome} placeholder="Inserisci il tuo nome"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" name="cognome" onChange={this.onChangeCognome} placeholder="Inserisci il tuo cognome"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control type="date" name="dataDiNascita" onChange={this.onChangeDataDiNascita} placeholder="Inserisci il tuo nome"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Comune di nascita</Form.Label>
                            <Form.Control type="text" name="comuneDiNascita" onChange={this.onChangeComuneDiNascita}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Cittadinanza</Form.Label>
                            <Form.Control type="text" name="cittadinanza" onChange={this.onChangeCittadinanza}/>
                        </Form.Group>

                    </Row>
                    <br/>
                    <h3>Residenza</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control type="text" name="indirizzo" onChange={this.onChangeIndirizzo} placeholder="Inserisci il tuo indirizzo"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control type="text" name="provincia" onChange={this.onChangeProvincia}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Comune</Form.Label>
                            <Form.Control type="text" name="comune" onChange={this.onChangeComuneDiNascita}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>CAP</Form.Label>
                            <Form.Control type="number" name="cap" onChange={this.onChangeCap}/>
                        </Form.Group>
                    </Row>
                    <br/>
                    <h3>Recapiti</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Cellulare</Form.Label>
                            <Form.Control type="number" name="telefono" onChange={this.onChangeCellulare} placeholder="Inserisci il tuo numero di cellulare" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" onChange={this.onChangeEmail} placeholder="Inserisci la tua email"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Conferma email</Form.Label>
                            <Form.Control type="text" name="confermaEmail" onChange={this.onChangeConfermaEmail} placeholder="Reinserisci la tua email"/>
                        </Form.Group>
                    </Row>

                    <Button className="submitButton" variant="primary" type="submit">
                        Richiedi tesserino
                    </Button>
                </Form>
            </div>
        )
    }
}
