import React from 'react'
import "../../styles/Footer.css"
export function Footer(){
    return (
        <body>
        <div id="container">
            <div id="part1">
                <div id="companyinfo"><a id="sitelink" href="#">UnisaEAT</a>
                    <p id="title">Prima app UNISA per i servizi della mensa dell'ateneo</p>
                    <p id="detail">Il progetto mira a velocizzare e semplificare il processo di fruizione dei pasti offerti dal servizio mensa.  </p>
                </div>
                <div id="explore">
                    <p id="txt1">Esplora</p> <a className="link" href="/Homepage">Home</a> <a className="link" href="#">About</a> <a
                    className="link" href="#">Ordini</a> <a className="link" href="#">Ticket</a>
                </div>
                <div id="visit">
                    <p id="txt2">Visit</p>
                    <p className="text">Lincoln House </p>
                    <p className="text">78 Bhulabhai Desai Road </p>
                    <p className="text">Mumbai 400 026 </p>
                    <p className="text">Phone: (22) 2363-3611 </p>
                    <p className="text">Fax: (22) 2363-0350 </p>
                </div>
                <div id="legal">
                    <p id="txt3">Legal</p> <a className="link1" href="#">Termini e condizioni</a> <a className="link1" href="#">Private
                    Policy</a>
                </div>

            </div>
        </div>
        </body>
        )
    }
    export default Footer