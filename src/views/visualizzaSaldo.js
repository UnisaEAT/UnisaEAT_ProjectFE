import React, {Component} from 'react'
import './componentsCss/visualizzaSaldoCSS.css'
import {Button} from "react-bootstrap";
import axios from 'axios';

export default class VisualizzaSaldo extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {saldo: ''}
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/tesserino/getInfoTesserino')
            .then(response => {
                this.setState({ saldo: response.data.saldo })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="containerSaldo container shadow-lg p-3 mb-5 bg-white rounded">
                <h4 className="saldoLabel">SALDO TESSERINO</h4>
                <p id="test" className="saldoNumberLabel">{this.state.saldo} €</p>

                <Button href="./ricaricaTesserino" className="buttonRicaricaTesserino">
                    Ricarica tesserino
                </Button>
            </div>
        )
    }
}
