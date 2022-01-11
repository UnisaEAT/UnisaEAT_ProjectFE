import React from 'react'
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";


export default class InserimentoFAQ extends React.Component {

    //Costruttore di props
    constructor(props) {
        super(props)

        this.state = {
            domanda:'',
            risposta:'',
            popUp: false
        }

        // Handlers binding
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeDomanda = this.onChangeDomanda.bind(this)
        this.onChangeRisposta = this.onChangeRisposta.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    closePopUp() {
        this.setState({popUp: false})
        window.location.reload();
    }

    errorHandler(error) {
        let inputError = error.name;
        let errorMessage = error.message;

        const rootElement = document.getElementById(inputError)

        if (rootElement.childNodes.length < 3) {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    errorRemoverOnChange(e) {
        let parent = document.getElementById(e.target.id);
        if (parent.childNodes.length > 2)
            parent.removeChild(parent.lastElementChild)
    }


    // Handlers definition
    onChangeDomanda(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            domanda: e.target.value
        })
    }

    onChangeRisposta(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            risposta: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const FAQ = {
            domanda: this.state.domanda,
            risposta: this.state.risposta,
            
        }

        this.submitInserimentoForm(FAQ)
    }

    // Invio dell'oggetto @param FAQ al metodo del Back-End con una POST
    submitInserimentoForm(FAQ) {
        axios.post('http://localhost:8080/api/faq/insertFAQ', FAQ)
            .then(response => {
                if (response.data.message===false) {
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
                } else {
                    this.setState({popUp: true})
                
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div id="root">
                 {/* Se popUp (boolean) è true */}
                 {this.state.popUp && <Popup message="Inserimento avvenuto con successo!" handleClose={this.closePopUp}/>}

                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <h1>Inserisci Nuova FAQ</h1><br></br>
                    <Form onSubmit={this.handleSubmit}>
                            <h3>Inserimento Domanda</h3><br></br>
                            <Row className="mb-3">
                                <Form.Group id="domanda" as={Col}>
                                    <Form.Label>Domanda</Form.Label>
                                    <Form.Control type="text" id="domanda" name="domanda" onChange={this.onChangeDomanda} placeholder="Inserisci la domanda"/>
                                </Form.Group>

                                <Form.Group id="risposta" as={Col}>
                                    <Form.Label>Risposta</Form.Label>
                                    <Form.Control type="text" id="risposta" name="risposta" onChange={this.onChangeRisposta} placeholder="Inserisci la risposta"/>
                                </Form.Group>
                            </Row>
                            
                            <Button className="submitButton" variant="primary" type="submit">
                                INSERISCI
                            </Button>
                    </Form>
                </Card>
            </div>
        )
    }
}