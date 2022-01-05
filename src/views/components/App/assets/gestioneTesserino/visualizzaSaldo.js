import React, {Component} from 'react'
import '../componentsCss/visualizzaSaldoCSS.css'
import {Button} from "react-bootstrap";
import axios from 'axios';

export default class VisualizzaSaldo extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            message: '',
            error: '',
            saldo: ''
        }
    }

    componentDidMount() {

        // Controllo se l'utente possiede o ha il tesserino rinnovato
        axios.get('http://localhost:3000/api/tesserino/isExpired')
            .then(response => {
                console.log(response.data)
                // Se il tesserino è scaduto
                if(response.data.message===true)
                {
                    this.setState({error: true})
                    this.setState({message: "scaduto"})
                }
                // Se l'utente non possiede il tesserino
                else if(response.data.message==="You don't have a Tesserino!")
                {
                    this.setState({error: true})
                    this.setState({message: "non posseduto"})
                }

            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:3000/api/tesserino/getInfoTesserino')
            .then(response => {
                this.setState({ saldo: response.data.saldo })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        if(this.state.error)
        {
            if(this.state.message==="non posseduto")
                return (
                    <div className="tesserinoPosseduto">
                        <h2>Non possiedi un tesserino</h2>
                    </div>
                )
            else if(this.state.message==="scaduto")
                return (
                    <div className="tesserinoPosseduto">
                        <h2>Il tuo tesserino è scaduto</h2>
                        <Button href="/gestioneTesserino/rinnovoTesserino" className="buttonRinnovaTesserinoScaduto">
                            Ricarica tesserino
                        </Button>
                    </div>
                )
        }
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
