import React from 'react'
import "../../styles/gestionePersonale/InserimentoPersonale.css"
import {Card} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";

export default class InserimentoPersonale extends React.Component {

    //Costruttore di props
    constructor(props) {
        super(props)

        this.state = {
            nome: '',
            cognome: '',
            indirizzo: '',
            numeroTelefono: '',
            dataDiNascita: '',
            email: '',
            password: '',
            confermapassword: '',
            popUp: false
        }

        // Handlers binding
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeNome = this.onChangeNome.bind(this)
        this.onChangeCognome = this.onChangeCognome.bind(this)
        this.onChangeIndirizzo = this.onChangeIndirizzo.bind(this)
        this.onChangeNumeroTelefono = this.onChangeNumeroTelefono.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeDataDiNascita = this.onChangeDataDiNascita.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfermaPassword = this.onChangeConfermaPassword.bind(this)
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
    onChangeNome(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            nome: e.target.value
        })
    }

    onChangeCognome(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            cognome: e.target.value
        })
    }

    onChangeIndirizzo(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            indirizzo: e.target.value
        })
    }

    onChangeNumeroTelefono(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            numeroTelefono: e.target.value
        })
    }

    onChangeEmail(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            email: e.target.value
        })
    }


    onChangeDataDiNascita(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            dataDiNascita: e.target.value
        })
    }


    onChangePassword(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            password: e.target.value
        })
    }

    onChangeConfermaPassword(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            confermapassword: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const personale = {
            nome: this.state.nome,
            cognome: this.state.cognome,
            indirizzo: this.state.indirizzo,
            numeroTelefono: this.state.numeroTelefono,
            email: this.state.email,
            dataDiNascita: this.state.dataDiNascita,
            password: this.state.password,
            confermapassword: this.state.confermapassword
        }

        this.submitInserimentoForm(personale)
    }

    // Invio dell'oggetto @param personale al metodo del Back-End con una POST
    submitInserimentoForm(personale) {
        axios.post('http://localhost:8080/api/personale/insert', personale)
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
                    <h1>Inserisci credenziali nuovo membro</h1>
                    <form className="form-card test" onSubmit={this.handleSubmit}>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex" id="nome">
                                <label className="form-control-label px-3">Nome<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="nome" onChange={this.onChangeNome}
                                       placeholder="Inserisci il nome"/>
                            </div>
                            <div className="form-group col-sm-6 flex-column d-flex" id="cognome">
                                <label className="form-control-label px-3">Cognome<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="cognome" onChange={this.onChangeCognome}
                                       placeholder="Inserisci il cognome"/>
                            </div>
                        </div>

                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex" id="indirizzo">
                                <label className="form-control-label px-3">Indirizzo<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="indirizzo" onChange={this.onChangeIndirizzo}
                                       placeholder="Inserisci indirizzo"/></div>

                            <div className="form-group col-sm-6 flex-column d-flex" id="numeroTelefono">
                                <label className="form-control-label px-3">Numero di telefono<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="numeroTelefono" onChange={this.onChangeNumeroTelefono}
                                       placeholder="Inserisci il numero di telefono"/>
                            </div>
                        </div>

                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex" id="dataDiNascita">
                                <label className="form-control-label px-3">Data di nascita<span
                                    className="text-danger"> *</span></label>
                                <input type="text" id="dataDiNascita" onChange={this.onChangeDataDiNascita}
                                       placeholder="Inserisci data di nascita"/>
                            </div>

                            <div className="form-group col-sm-6 flex-column d-flex" id="email">
                                <label className="form-control-label px-3">Email<span className="text-danger"> *</span></label>
                                <input type="text" id="email" onChange={this.onChangeEmail}
                                       placeholder="Inserisci una email "/>
                            </div>
                        </div>


                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex" id="password">
                                <label className="form-control-label px-3">Password<span
                                    className="text-danger"> *</span></label>
                                <input type="password" id="password" onChange={this.onChangePassword}
                                       placeholder="Inserisci una password "/>
                            </div>

                            <div className="form-group col-sm-6 flex-column d-flex" id="confermapassword"><label
                                className="form-control-label px-3">Conferma Password<span
                                className="text-danger"> *</span></label>
                                <input type="password" id="confermapassword" onChange={this.onChangeConfermaPassword}
                                       placeholder="Conferma la Password "/>
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