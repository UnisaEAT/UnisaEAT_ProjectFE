import React from 'react'
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";

export default class CompilazioneTicket extends React.Component {

    //Costruttore di props
    constructor(props) {
        super(props)

        this.state = {
            titolo:'',
            problema:'',
            popUp:false
        }

        // Handlers binding
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeTitolo = this.onChangeTitolo.bind(this)
        this.onChangeProblema = this.onChangeProblema.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.errorRemoverOnChange=this.errorRemoverOnChange.bind(this)
    }

    closePopUp() {
        this.setState({popUp: false})
        window.location='/gestioneTicket/visualizzazioneTicket'
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
    onChangeTitolo(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            titolo: e.target.value
        })
    }

    onChangeProblema(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            problema: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const Ticket = {
            titolo: this.state.titolo,
            problema: this.state.problema,
            email:localStorage.getItem("email")
        }

        this.submitInserimentoForm(Ticket)
    }

    // Invio dell'oggetto @param Ticket al metodo del Back-End con una POST
    submitInserimentoForm(Ticket) {
        axios.post('http://localhost:8080/api/ticket/insert', Ticket)
            .then(response => {
                console.log(response.data)
                if (response.data.message === true) {
                    this.setState({popUp: true})
                } else if (response.data.name != null)
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
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
                    <h1>Inserimento Ticket</h1><br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <h3>Inserisci il titolo del ticket</h3><br></br>
                        <Row className="mb-3">
                            <Form.Group id="titolo" as={Col}>
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control type="text" id="titolo" name="titolo" onChange={this.onChangeTitolo} placeholder="Inserisci il titolo"/>
                            </Form.Group>
                            <br></br>
                            <Form.Group id="problema" as={Col}>
                            <Form.Label>Descrivici il problema riscontrato</Form.Label>
                                <Form.Control type="text" id="problema" name="problema" onChange={this.onChangeProblema} placeholder="Inserisci il problema riscontrato"/>
                            </Form.Group>
                        </Row>
                        <Button  className="submitButton" variant="primary" type="submit">INSERISCI</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}