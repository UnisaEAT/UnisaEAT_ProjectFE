import React from 'react'
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import "../../styles/gestioneFAQ/faqCSS.css"
import FailurePopUp from "../App/failurePopUp";


export default class InserimentoFAQ extends React.Component {

    //Costruttore di props
    constructor(props) {
        super(props)

        this.state = {
            domanda:'',
            risposta:'',
            popUp: false,
            failurePopUp:false,
            redirect:false,
            error:false
        }

        // Handlers binding
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeDomanda = this.onChangeDomanda.bind(this)
        this.onChangeRisposta = this.onChangeRisposta.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.closeFailurePopUp= this.closeFailurePopUp.bind(this)
    }

    closeFailurePopUp(){
        this.setState({failurePopUp: false})
        window.location.reload()
    }
    componentDidMount() {
        if(!localStorage.getItem("email"))
            this.setState({error:400})
        else if(localStorage.getItem("ruolo")!="personale adisu")
            this.setState({error:401})
    }

    closePopUp() {
        this.setState({popUp: false})
        this.setState({redirect: true})
        window.location = "/gestioneFAQ/visualizzazioneFAQ"
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
            email: localStorage.getItem("email"),
            ruolo: localStorage.getItem("ruolo")
            
        }

        this.submitInserimentoForm(FAQ)
    }

    // Invio dell'oggetto @param FAQ al metodo del Back-End con una POST
    submitInserimentoForm(FAQ) {
        axios.post('http://localhost:8080/api/faq/insertFAQ', FAQ)
            .then(response => {
                console.log(response.data)
                if (response.data.message === "Inserimento avvenuto con successo.") {
                    this.setState({popUp: true})
                }
                else if (response.data.message === false) {
                    this.setState({failurePopUp:true})
                }
                else if (response.data.message != true)
                    console.log(response.data.message)
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    
    render() {
        if(this.state.error===400)
            return <h1 className="erroreGenericoDiAccesso">Effettua il login per accedere a questa pagina</h1>
        else if(this.state.error===401)
            return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>
        else if (this.state.redirect) {
            return (<Redirect to='/gestioneFAQ/visualizzazioneFAQ'/>) 

        } else
        return (
            <div id="root">
                 {/* Se popUp (boolean) è true */}
                 {this.state.popUp && <Popup message="Inserimento avvenuto con successo!" handleClose={this.closePopUp}/>}
                 {this.state.failurePopUp && <FailurePopUp message="Impossibile inserire la FAQ, è già presente nel database." handleClose={this.closeFailurePopUp}/>}
                <Card className="inserisciFAQcontainer mx-auto col-xl-7 justify-content-center text-center">
                    <h1>Inserisci una nuova FAQ</h1>
                    <Form onSubmit={this.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group id="domanda" as={Row}>
                                    <Form.Label>Domanda</Form.Label>
                                    <Form.Control type="text" id="domanda" name="domanda" onChange={this.onChangeDomanda} placeholder="Inserisci la domanda"/>
                                </Form.Group>

                                <Form.Group id="risposta" as={Row}>
                                    <Form.Label>Risposta</Form.Label>
                                    <Form.Control type="text" id="risposta" name="risposta" onChange={this.onChangeRisposta} placeholder="Inserisci la risposta"/>
                                </Form.Group>
                            </Row>
                            
                            <Button  className="submitButton" variant="primary" type="submit">
                                INSERISCI
                            </Button>
                    </Form>
                </Card>
            </div>
        )
    }
}