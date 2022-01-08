import React, {Component} from 'react'

import axios from 'axios';
import "../../styles/gestioneOrdinePasto/pagamentoPastoCSS.css"
import {Button} from "react-bootstrap";
import Popup from "../App/successPopUp";

export default class PagamentoPasto extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            ordine: [],
            prezzoTotale: 0,
            popUp:false,

        }
        this.imageNameTextTransform = this.imageNameTextTransform.bind(this)
        this.onClickConfermaOrdine = this.onClickConfermaOrdine.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.errorHandlerSaldoInsufficiente = this.errorHandlerSaldoInsufficiente.bind(this)
    }

    closePopUp()
    {
        this.setState({popUp:false})
        window.location.href="/"
    }

    componentDidMount()
    {

        let ordine = JSON.parse(localStorage.getItem('ordine'))
        console.log(ordine)
        this.setState({ordine: ordine.nomePiatti})
        this.setState({prezzoTotale: ordine.prezzoTotale})
    }

    imageNameTextTransform(nomePasto)
    {
        return nomePasto.split(' ').join('_').toLowerCase()
    }

    //TODO gestire con notifica?
    errorHandlerSaldoInsufficiente()
    {
        let el = document.getElementsByClassName("pp-prezzoOrdineContainer")[0]
        let error = document.createElement('h4')
        error.textContent="Saldo del tesserino insufficiente"
        error.style="color:red"
        if(el.childNodes.length<3)
        {
            el.appendChild(error)
        }
    }

    onClickConfermaOrdine()
    {
        let ordine = JSON.parse(localStorage.getItem('ordine'))

        //TODO localstorage
        const objOrdine = {
            email : localStorage.getItem("email"),
            prezzo : ordine.prezzoTotale,
            boolPranzo : ordine.boolPranzo,
            idPasti : ordine.idPiatti
        }

        axios.post('http://localhost:8080/api/ordine/create',objOrdine)
            .then(response => {
                console.log(response.data)
                if(response.data===true)
                {
                    //TODO localStorage
                    //localStorage.removeItem(email)
                    this.setState({popUp:true})
                }
                else if(response.data.hasOwnProperty("error"))
                {
                    this.errorHandlerSaldoInsufficiente()
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        console.log(this.state.popUp)
        return (
            <div className="pp-centralContainer">
                {this.state.popUp && <Popup message="Ordine effettuato" handleClose={this.closePopUp}/>}
                <div className="pp-riepilogoOrdine">
                    <h4>Riepilogo ordine</h4>
                    {
                        this.state.ordine.map((pasto,i) => {
                            return (
                                <div id={i} key={i} className="pp-pastoElement">
                                    <div className="pp-leftBlock">
                                        <div className="pp-insideBlockElement">
                                            <div className="pp-elementTitle">
                                                {pasto}
                                            </div>
                                        </div>
                                    </div>
                                <div className="pp-rightBlock">
                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto)+".jpg"} />
                                </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pp-pagamentoContainer">
                    <h4>Pagamento</h4>
                    <div className="pp-prezzoOrdineContainer">
                        <h2>{this.state.prezzoTotale} €</h2>
                        <Button className="pp-buttonPagamento" onClick={this.onClickConfermaOrdine}>Conferma ordine</Button>
                    </div>
                </div>
            </div>
        );
    }
}