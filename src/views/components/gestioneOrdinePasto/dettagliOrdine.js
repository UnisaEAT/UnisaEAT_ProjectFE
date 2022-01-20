import React, {Component} from 'react'

import axios from 'axios';
import QRCode from "qrcode.react" //--> https://openbase.com/js/qrcode.react : link libreria
import "../../styles/gestioneOrdinePasto/dettagliOrdineCSS.css"

export default class DettagliOrdine extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            ordineListaPasti: [],
            ordine: {},
            error: false


        }
        this.imageNameTextTransform = this.imageNameTextTransform.bind(this)
        }

        componentDidMount()
        {
            // Controlli sessione
            // error 400 : login non effettuato
            // error 401 : accesso non autorizzato per questo ruolo
            if(!localStorage.getItem("email"))
                this.setState({error:400})
            else if(localStorage.getItem("ruolo")!="cliente")
                this.setState({error:401})
            else {
                let ordine = JSON.parse(localStorage.getItem("dettagliOrdine"))
                this.setState({ordineListaPasti: ordine.listaPasti})
                this.setState({ordine: ordine})
            }
        }

        imageNameTextTransform(nomePasto)
        {
            return nomePasto.split(' ').join('_').toLowerCase()
        }

        render()
        {
            if(this.state.error===400)
                return <h1 className="erroreGenericoDiAccesso">Effettua il login per accedere a questa pagina</h1>
            else if(this.state.error===401)
                return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>

            var boolPranzo="Cena"
            if(this.state.ordine.boolPranzo)
                boolPranzo="Pranzo"

            var QrCode = ""+this.state.ordine.id+""

            console.log(this.state.ordine.id)

            return (
                <div className="do-mainContainer">
                    <div className="do-upContainer">
                        <div className="do-piattiBlock">
                            <h4>Piatti ordinati</h4>
                            <br/>
                            {
                                this.state.ordineListaPasti.map((pasto, i) => {
                                    return (
                                        <div id={i} key={i} className="do-pastoElement">
                                            <div className="do-leftBlock">
                                                <div className="do-insideBlockElement">
                                                    <div className="do-elementTitle">
                                                        {pasto.nome}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="do-rightBlock">
                                                <div className="do-rightBlock">
                                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto.nome)+".jpg"} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="do-detailsBlock">
                            <h4>Dettagli ordine</h4>
                            <br/>
                            <div className="do-infoBlock">
                                <p>
                                    <span className="do-info">Prezzo totale </span>
                                    <span className="do-value-price">{this.state.ordine.prezzo} euro</span>
                                </p>
                                <p>
                                    <span className="do-info">Data ordine </span>
                                    <span className="do-value">{this.state.ordine.dataOrdine}</span>
                                </p>
                                <p>
                                    <span className="do-info">Ordinato per </span>
                                    <span className="do-value">{boolPranzo}</span>
                                </p>
                            </div>
                            <br/>
                            <div className="do-qrBlock">
                                <h4>QR code</h4>
                                <p>Mostralo in mensa per ritirare l'ordine</p>
                                    <QRCode id="qr" value={QrCode} size="160"/>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
}