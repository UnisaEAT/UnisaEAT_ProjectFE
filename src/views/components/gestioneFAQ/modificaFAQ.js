import React from 'react'
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";

export default class ModificaFAQ extends React.Component {

     //Costruttore di props
     constructor(props) {
        super(props);
        this.state= {
            newdomanda:'',
            newrisposta:'',
            popUp: false
        }
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeDomanda = this.onChangeDomanda.bind(this)
        this.onChangeRisposta = this.onChangeRisposta.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.modificaFAQ = this.modificaFAQ.bind(this)
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
            newdomanda: e.target.value
        })
    }

    onChangeRisposta(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            newrisposta: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const FAQ = {
            domanda: this.props.obj.domanda,
            newdomanda: this.state.newdomanda,
            newrisposta: this.state.newrisposta,
        }

        this.modificaFAQ(FAQ)
    }

    modificaFAQ(FAQ) {
        console.log(FAQ)
        axios.post("http://localhost:8080/api/faq/updateFAQ", FAQ)
            .then(response => {
                console.log(response.data)
                if (response.data.message === false) {
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
                }else
                    this.setState({popUp: true})
            })
            .catch((error) => {
                console.log("ciao")
                console.log(error);
            })
    }

    render() {
        return (
            <div id="root">
                 {/* Se popUp (boolean) è true */}
                 {this.state.popUp && <Popup message="Modifica avvenuta con successo!" handleClose={this.closePopUp}/>}

                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <h1>Modifica Domanda</h1><br></br>
                    <h4>{this.props.obj.domanda}</h4> 
                    <Form onSubmit={this.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group id="newdomanda" as={Col}>
                                    <Form.Label>Nuova domanda</Form.Label>
                                    <Form.Control type="text" id="newdomanda" name="newdomanda" onChange={this.onChangeDomanda} placeholder="Inserisci la nuova domanda"/>
                                </Form.Group>

                                <Form.Group id="newrisposta" as={Col}>
                                    <Form.Label>Nuova Risposta</Form.Label>
                                    <Form.Control type="text" id="newrisposta" name="newrisposta" onChange={this.onChangeRisposta} placeholder="Inserisci la nuova risposta"/>
                                </Form.Group>
                            </Row>
                            
                            <Button type="submit" >Modifica</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}