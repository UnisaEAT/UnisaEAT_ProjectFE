import React from 'react'
import './componentsCss/visualizzaSaldoCSS.css'
import {Button} from "react-bootstrap";

export function VisualizzaSaldo()
{
    return(
        <div className="containerSaldo container shadow-lg p-3 mb-5 bg-white rounded">
                <h4 className="saldoLabel">SALDO TESSERINO</h4>
                <p className="saldoNumberLabel">54 €</p>

                <Button href="./ricaricaTesserino" className="buttonRicaricaTesserino">
                    Ricarica tesserino
                </Button>
        </div>
    )
}

export default VisualizzaSaldo;