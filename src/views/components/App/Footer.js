import React from 'react'
import "../../styles/AppStyle/Footer.css"

export function Footer() {
    return (
        <div id="container">
            <div id="part1">
                <div id="companyinfo"><a id="sitelink" href="#">UnisaEAT</a>
                    <p id="title">Prima app UNISA per i servizi della mensa dell'ateneo</p>
                    <p id="detail">Il progetto mira a velocizzare e semplificare il processo di fruizione dei pasti
                        offerti dal servizio mensa. </p>
                </div>
                <div id="explore">
                    <p id="txt1">Esplora</p> <a className="link" href="/Homepage">Home</a> <a className="link"
                                                                                              href="#">About</a> <a
                    className="link" href="#">Ordini</a> <a className="link" href="#">Ticket</a>
                </div>
                <div id="visit">
                    <p id="txt2">Visit</p>
                    <p className="text">Università degli studi di Salerno </p>
                    <p className="text">Fisciano</p>
                    <p className="text">Mensa UNISA </p>
                    <p className="text">Sedi: Baronissi,Fisciano </p>
                </div>
                <div id="legal">
                    <p id="txt3">Legal</p> <a className="link1" href="#">Termini e condizioni</a> <a className="link1"
                                                                                                     href="#">Private
                    Policy</a>
                </div>

            </div>
        </div>
    )
}

export default Footer