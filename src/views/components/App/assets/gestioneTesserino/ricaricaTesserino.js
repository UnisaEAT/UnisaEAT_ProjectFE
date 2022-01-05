import React, {Component} from "react";
import '../componentsCss/ricaricaTesserinoCSS.css'
import axios from "axios";
import {Form} from "react-bootstrap";
import Popup from "../successPopUp";

export default class RicaricaTesserino extends Component {


    constructor(props) {
        super(props)

        this.state = {
            message: '',
            intestatario: '',
            tipoCarta: '',
            numeroCarta: '',
            dataScadenzaCarta: '',
            cvv: '',
            importo: 0,
            popUp: false
        }

        // Handlers binding
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onChangeIntestatario = this.onChangeIntestatario.bind(this)
        this.onChangeTipoCarta = this.onChangeTipoCarta.bind(this)
        this.onChangeNumeroCarta = this.onChangeNumeroCarta.bind(this)
        this.onChangeDataScadenzaCarta = this.onChangeDataScadenzaCarta.bind(this)
        this.onChangeCvv = this.onChangeCvv.bind(this)
        this.onChangeImporto = this.onChangeImporto.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    closePopUp()
    {
        this.setState({popUp:false})
        window.location.reload(false);
    }

    errorHandler(error)
    {
        let inputError = error.name;
        let errorMessage = error.message;

        const rootElement = document.getElementById(inputError)

        if(rootElement.childNodes.length<3)
        {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    errorRemoverOnChange(e)
    {
        let parent = document.getElementById(e.target.id);
        if(parent.childNodes.length>2)
            parent.removeChild(parent.lastElementChild)
    }

    componentDidUpdate() {
        if (this.state.importo === '' || this.state.importo < 0) {
            this.setState({importo: '0'})
        }
    }

    // Handlers definition
    onChangeIntestatario(e) {

        this.errorRemoverOnChange(e)
        this.setState({
            intestatario: e.target.value
        })
    }

    onChangeTipoCarta(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            tipoCarta: e.target.value
        })
    }

    onChangeNumeroCarta(e) {
        let parent = document.getElementById('numeroCarta');
        if(parent.childNodes.length>2)
            parent.removeChild(parent.lastElementChild)

        this.setState({
            numeroCarta: e.target.value
        })
    }

    onChangeDataScadenzaCarta(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            dataScadenzaCarta: e.target.value
        })
    }

    onChangeCvv(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            cvv: e.target.value
        })
    }

    onChangeImporto(e) {
        this.errorRemoverOnChange(e)
        this.setState({importo: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const ricarica = {
            intestatario: this.state.intestatario,
            tipoCarta: this.state.tipoCarta,
            numeroCarta: this.state.numeroCarta,
            dataScadenzaCarta: this.state.dataScadenzaCarta,
            cvv: this.state.cvv,
            importo: this.state.importo,
        }

        this.submitRicaricaForm(ricarica)
    }

    // Invio dell'oggetto @param ricarica al metodo ricaricaTesserino di controller_tesserino con una POST
    submitRicaricaForm(ricarica) {
        axios.post('http://localhost:3000/api/tesserino/ricaricaTesserino', ricarica)
            .then(response => {
                console.log("qui"+response.data.message)

                //Se la ricarica è andata a buon fine
                if(response.data.message===true)
                {
                    this.setState({popUp:true})
                }
                else if (response.data.name != null)
                    this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleClick(value) {
        this.refs.importoRef.value = "";
        this.setState({importo: value})

        let parent = document.getElementById("importo");
        if(parent.childNodes.length>2)
            parent.removeChild(parent.lastElementChild)
    }


    render() {
        return (
            <div id="root">

                {/* Se popUp (boolean) è true */}
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}

                <form onSubmit={this.handleSubmit}>
                    <div className="containerRicarica container">
                        <div className="wrapper pagamentoWrapper">
                            <h4 className="text-uppercase">Dettagli pagamento</h4>

                            <div id="intestatario" className="form-group">
                                <label htmlFor="name" className="text-uppercase">Intestatario</label>
                                <input type="text" id="intestatario"
                                       onChange={this.onChangeIntestatario} className="form-control"
                                       placeholder="Nome Cognome"/>
                            </div>

                            <div id="tipoCarta" className="form-group">
                                <label htmlFor="name" className="text-uppercase">Tipo carta</label>
                                <Form.Select id="tipoCarta" name="tipoCarta" onChange={this.onChangeTipoCarta} defaultValue="">
                                    <option value="" disabled>
                                        Seleziona un tipo di carta
                                    </option>
                                    <option value="Visa">Visa</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="AmericanExpress">American Express</option>
                                </Form.Select>
                            </div>
                            <div id="numeroCarta" className="form-group">
                                <label htmlFor="card" className="text-uppercase">Numero carta</label>
                                <div className="card-number">
                                    <input name="numeroCarta" id="numeroCarta" type="text" onChange={this.onChangeNumeroCarta}
                                                                    className="card-no" step="4"
                                                                    placeholder="1234 4567 5869 1234"
                                                                    pattern="^[0-9].{15,}"/>
                                </div>
                            </div>
                            <div className="d-flex w-100">
                                <div className="d-flex w-50 pr-sm-4">
                                    <div id="dataScadenzaCarta" className="form-group">
                                        <label htmlFor="expiry" className="text-uppercase">data scadenza</label>
                                        <input name="dataScadenzaCarta" id="dataScadenzaCarta" type="text"
                                               onChange={this.onChangeDataScadenzaCarta}
                                               className="form-control dataScadenzaInput" placeholder="03/2020"/>
                                    </div>
                                </div>
                                <div className="d-flex w-50 pl-sm-5 pl-3">
                                    <div id="cvv" className="form-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <input name="cvv" id="cvv" type="password" onChange={this.onChangeCvv}
                                               className="form-control pr-5" maxLength="3"
                                               placeholder="123"/></div>
                                </div>
                            </div>
                        </div>

                        <div className="amountWrapper wrapper">
                            <h4 className="text-uppercase">Importo</h4>
                            <div id="importo" className="form-group">
                                <label htmlFor="name" className="text-uppercase">inserisci l'importo da caricare</label>
                                <input name="importo" id="importo" type="number" autoComplete="off" min="0" className="form-control"
                                       ref="importoRef" placeholder="Digita il tuo importo"
                                       onChange={this.onChangeImporto}/></div>
                            <div className="form-group">
                                <br/>
                                <label htmlFor="name" className="text-uppercase">oppure seleziona un importo</label>
                            </div>
                            <div className="form-group containerBottoniSaldo">
                                <input onClick={() => this.handleClick(5)} type="button" value="5 €"
                                       className="text-uppercase btn btn-primary bottoneSaldo"/>
                                <input onClick={() => this.handleClick(10)} type="button" value="10 €"
                                       className="text-uppercase btn btn-primary bottoneSaldo"/>
                                <input onClick={() => this.handleClick(20)} type="button" value="20 €"
                                       className="text-uppercase btn btn-primary bottoneSaldo"/>
                                <input onClick={() => this.handleClick(50)} type="button" value="50 €"
                                       className="text-uppercase btn btn-primary bottoneSaldo"/>
                            </div>
                            <div className="form-group">
                                <p className="text-uppercase nuovoSaldoLabel">saldo da ricaricare</p>
                                <p className="text-uppercase nuovoSaldoAmount" id="test">{this.state.importo} €</p>
                            </div>


                            <div className="my-3">
                                <br/>
                                <input type="submit" value="ricarica"
                                       className="text-uppercase btn btn-primary btn-block p-3 ricaricaButton"/></div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

