import React, {Component} from 'react'
import '../../styles/gestioneTesserino/visualizzaSaldoCSS.css'
import {Button} from "react-bootstrap";
import axios from 'axios';

export default class VisualizzaSaldo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            error: false,
            saldo: 0
        }
    }

    componentDidMount() {

        if(!localStorage.getItem("email"))
        {
            this.setState({error:401})
        }
        else {
            // Controllo stato del tesserino dell'utente
            axios.post('http://localhost:8080/api/tesserino/isExpired', {
                email: localStorage.getItem("email"),
                ruolo: localStorage.getItem("ruolo")
            })
                .then(response => {
                    // Se il tesserino è scaduto
                    if (response.data.message === true) {
                        this.setState({error: true})
                        this.setState({message: "scaduto"})
                    }
                    // Se l'utente non possiede il tesserino
                    else if (response.data.message === "You don't have a Tesserino!") {
                        this.setState({error: true})
                        this.setState({message: "non posseduto"})
                    }

                })
                .catch((error) => {
                    console.log(error);
                })

            axios.post('http://localhost:8080/api/tesserino/getInfoTesserino', {
                email: localStorage.getItem("email"),
                ruolo: localStorage.getItem("ruolo")
            })
                .then(response => {
                    this.setState({saldo: response.data.saldo})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    render() {
        if(this.state.error===401)
        {
            return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>
        }
        else if (this.state.error) {
            if (this.state.message === "non posseduto")
                return (
                    <div className="tesserinoPosseduto">
                        <h2>Non possiedi un tesserino</h2>
                        <Button href="/gestioneTesserino/richiestaTesserino" className="buttonRinnovaTesserinoScaduto">
                            Richiedi tesserino
                        </Button>
                    </div>
                )
            else if (this.state.message === "scaduto")
                return (
                    <div className="tesserinoPosseduto">
                        <h2>Il tesserino è scaduto</h2>
                        <Button href="/gestioneTesserino/rinnovoTesserino" className="buttonRinnovaTesserinoScaduto">
                            Rinnova tesserino
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
