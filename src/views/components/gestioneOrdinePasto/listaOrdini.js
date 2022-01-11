import React, {Component} from 'react'

import axios from 'axios';
import QRCode from "qrcode.react" //--> https://openbase.com/js/qrcode.react : link libreria
import {ListGroup, Button} from "react-bootstrap";
import "../../styles/gestioneOrdinePasto/listaOrdiniCSS.css"
export default class ListaOrdini extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            ordini : [],
        }

        this.onClickVisualizzaOrdine = this.onClickVisualizzaOrdine.bind(this)
    }


    componentDidMount()
    {
        localStorage.removeItem("dettagliOrdine")
        axios.post('http://localhost:8080/api/ordine/getOrdini', {ruolo:localStorage.getItem("ruolo"), email:localStorage.getItem("email")})
            .then(response => {
                console.log(response.data)
                this.setState({ordini:response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onClickVisualizzaOrdine(e)
    {
        localStorage.setItem("dettagliOrdine",e.target.value)
        window.location.href="/gestioneOrdinePasto/dettagliOrdine"
    }


    render() {
        return (
            <div className="lo-listaContainerInfo">
                <table className="lo-table">
                    <tbody>
                        <tr className="lo-rowInfo">
                            <th>Data ordine</th>
                            <th>Tipo menù</th>
                            <th>Prezzo</th>
                            <th></th>
                        </tr>
                    </tbody>
                    <tr className="lo-rowNoOp"><td></td></tr>
                {
                    this.state.ordini.map((ordine,i) => {
                        var boolPranzo="Cena"
                        if(ordine.boolPranzo)
                            boolPranzo="Pranzo"

                        return(
                                <tr key={i} className="lo-rowData">
                                    <td>{ordine.dataOrdine}</td>
                                    <td>{boolPranzo}</td>
                                    <td>- {ordine.prezzo} €</td>
                                    <td className="lo-buttonTd">
                                        <Button  value={JSON.stringify(ordine)} onClick={this.onClickVisualizzaOrdine} className="lo-dettagliButton">Dettagli</Button>
                                    </td>
                                </tr>
                        )
                    })
                }
                </table>
            </div>
        );
    }
}