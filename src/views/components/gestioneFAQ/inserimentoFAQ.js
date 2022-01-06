import React from 'react'
import {Card} from "react-bootstrap";
import axios from "axios";
import "../../styles/gestioneFAQ/FAQ.css"
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

    // Invio dell'oggetto @param personale al metodo del Back-End con una POST
    submitInserimentoForm(personale) {
        axios.post('http://localhost:8080/api/faq/insertFAQ', FAQ)
            .then(response => {
                //Se l'inserimento è andato a buon fine
                if (response.data.message === true) {
                    this.setState({popUp: true})
                } else if (response.data.name != null)
                    this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <h1>Inserisci Nuova FAQ</h1>
                    <form className="form-card test" onSubmit={this.handleSubmit}>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex" id="nome">
                                <label className="form-control-label px-3">Domanda<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="nome" onChange={this.onChangeDomanda}
                                       placeholder="Inserisci il nome"/>
                            </div>
                            <div className="form-group col-sm-6 flex-column d-flex" id="cognome">
                                <label className="form-control-label px-3">Risposta<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="cognome" onChange={this.onChangeRisposta}
                                       placeholder="Inserisci il cognome"/>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="form-group col-sm-6">
                                <button type="submit" className="btn-block btn-primary">Inserisci</button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        )
    }
}