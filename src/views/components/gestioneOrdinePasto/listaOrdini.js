import React, {Component} from 'react'

import axios from 'axios';
import QRCode from "qrcode.react" //--> https://openbase.com/js/qrcode.react : link libreria
import {ListGroup} from "react-bootstrap";
import "../../styles/gestioneOrdinePasto/listaOrdiniCSS.css"
export default class ListaOrdini extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            ordini : [],
        }
    }

    componentDidMount()
    {
        //TODO localStorage
        axios.post('http://localhost:8080/api/ordine/getOrdini', {ruolo:"cliente", email:"n.cappello@studenti.unisa.it"})
            .then(response => {
                console.log(response.data)
                this.setState({ordini:response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="lo-listaContainer">
                <ListGroup as="ol" numbered>
                {
                    this.state.ordini.map((ordine,i) => {
                        var boolPranzo="Cena"
                        if(ordine.boolPranzo)
                            boolPranzo="Pranzo"

                        return (


                                <ListGroup.Item as="li">{ordine.dataOrdine} {boolPranzo}</ListGroup.Item>
                        )
                    })
                }
                </ListGroup>
            </div>
        );
    }
}