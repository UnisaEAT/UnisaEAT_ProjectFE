import React, {Component} from 'react'

import axios from 'axios';
import "../../styles/gestioneOrdinePasto/sceltaPastiCSS.css"
import {Button, FormSelect} from "react-bootstrap";

export default class SceltaPasti extends React.Component {


    //TODO GESTIRE L'ERRORE DELLA SESSIONE
    constructor(props) {

        super(props);

        this.state = {
            pasti: [],
            pastiSelezionati:[],
            boolPranzo: false,
            boolCena: false,
            boolOrdine: 'pranzo', //boolPranzo

            primoPastoNome: null,
            secondoPastoNome: null,
            contornoPastoNome: null,
            fruttaPastoNome: null,
            extraPastiNomi: [],

            primoPastoID: null,
            secondoPastoID: null,
            contornoPastoID: null,
            fruttaPastoID: null,
            extraPastoIDs: [],

            primoIDKey: null,
            secondoIDKey: null,
            contornoIDKey: null,
            fruttaIDKey: null,
            extrasIDKeys: [],
        };


        this.onChangeTipoMenu = this.onChangeTipoMenu.bind(this)
        this.onClickSelectPasto = this.onClickSelectPasto.bind(this)
        this.handleError = this.handleError.bind(this)
        this.onClickConfermaComposizione = this.onClickConfermaComposizione.bind(this)
        this.imageNameTextTransform = this.imageNameTextTransform.bind(this)
        this.onMouseEnterElement = this.onMouseEnterElement.bind(this)
        this.onMouseLeaveElement = this.onMouseLeaveElement.bind(this)
    }



    componentDidMount()
    {

        axios.post('http://localhost:8080/api/ordine/hasOrdini',{email:localStorage.getItem("email"), ruolo:localStorage.getItem("ruolo")})
            .then(response => {
                console.log(response.data)
                this.setState({boolPranzo:response.data.pranzo})
                this.setState({boolCena:response.data.cena})

                // Controllo e stampa menu se l'utente non ha effettuato l'ordine per pranzo (selezione base della select)
                axios.post('http://localhost:8080/api/ordine/ordinaPasti',{ruolo:localStorage.getItem("ruolo")})
                    .then(response2 => {
                        if(response2.data.hasOwnProperty("error"))
                            this.handleError(response2.data.error)
                        // Ordine già effettuato per pranzo
                        else if(response.data.pranzo && response.data.cena===false)
                            this.handleError("Oggi hai già ordinato per pranzo")
                        // Ordine disponibile per pranzo
                        else if(response.data.pranzo===false && response.data.cena)
                            this.setState({pasti: response2.data.pranzo})
                        // Entrambi disponibili -> mostra quello per pranzo
                        else if(!response.data.pranzo && !response.data.cena)
                            this.setState({pasti: response2.data.pranzo})
                        //Nessun ordine disponibile da poter effettuare
                        else
                            this.handleError("Oggi hai già ordinato sia per pranzo che per cena")
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })


    }

    // Nasconde il contenuto della pagina e mostra solo l'errore
    handleError(errorText)
    {
        let parent = document.getElementsByClassName("root")[0]
        let child = document.getElementsByClassName("sp-selectOrderContainer")[0].style="display:none"

        if(parent.childNodes.length<3) {
            let error = document.createElement('div')
            error.id="errore"
            error.textContent = errorText
            error.style = "font-width:800;margin-top:80px;text-align:center;font-size:25px;margin-bottom:5%"

            parent.appendChild(error)
        }
    }

    onChangeTipoMenu(e)
    {

        //TODO risolvere la deselezione del div al cambio di menu

        if(document.getElementById("errore"))
            document.getElementById("errore").remove()

        this.setState({boolOrdine:e.target.value})

        // Controllo pasti prenotabili disponibili in base alla select del tipo di menu (pranzo, cena)
        axios.post('http://localhost:8080/api/ordine/ordinaPasti',{ruolo:localStorage.getItem("ruolo")})
            .then(response => {
                if(response.data.hasOwnProperty("error"))
                    this.handleError(response.data.error)
                //Nessun ordine disponibile
                else if(this.state.boolCena===true && this.state.boolPranzo===true) {
                    this.setState({pasti: []})
                    this.handleError("Oggi hai già ordinato sia per pranzo che per cena")
                }
                //Dispobilità di entrambi -> menu pranzo
                else if(this.state.boolCena===false && this.state.boolPranzo===false && e.target.value==="pranzo")
                    this.setState({pasti: response.data.pranzo})
                //Dispobilità di entrambi -> menu cena
                else if(this.state.boolCena===false && this.state.boolPranzo===false && e.target.value==="cena")
                    this.setState({pasti: response.data.cena})
                //Pranzo disponibile
                else if(this.state.boolPranzo===false && e.target.value==="pranzo") {
                    console.log("qui")
                    this.setState({pasti: response.data.pranzo})
                }
                //Pranzo non disponibile
                else if(this.state.boolPranzo===true && e.target.value==="pranzo")
                {
                    this.setState({pasti: []})
                    this.handleError("Oggi hai già ordinato per pranzo")
                }
                //Cena disponibile
                else if(this.state.boolCena===false && e.target.value==="cena") {
                    this.setState({pasti: response.data.cena})
                }
                //Cena non disponibile
                else if(this.state.boolCena===true && e.target.value==="cena") {
                    this.setState({pasti: []})
                    this.handleError("Oggi hai già ordinato per cena")
                }

            })
            .catch((error) => {
                console.log(error);
            })


        let showContainer = document.getElementsByClassName("sp-selectOrderContainer")[0].style.display="block"
    }

    // Selezione unica del pasto per ogni portata simulando un radio button ma con i div
    // E composizione dell'ordine da inviare alla pagina del pagamento
    onClickSelectPasto(idPasto,nomePasto,categoria,e)
    {
        var selectedStyle = "box-shadow: 0px 4px 16px rgb(0 0 0 / 30%);background:#F0F0F0;border-color:black"
        var prevStyle = "border-color:lightgrey;"


        if(categoria=="primo") {

            this.setState({primoPastoID:idPasto})

            var prevPrimoIDKey = this.state.primoIDKey

            if (prevPrimoIDKey == null) {
                document.getElementById(e).style = selectedStyle
                this.setState({primoIDKey: e})
                this.setState({primoPastoNome: nomePasto})
            }
            else if (prevPrimoIDKey === e) {
                document.getElementById(e).style = ""
                this.setState({primoIDKey: null})
                this.setState({primoPastoID:null})
                this.setState({primoPastoNome: null})
            }else {
                document.getElementById(prevPrimoIDKey).style = prevStyle
                document.getElementById(e).style = selectedStyle
                this.setState({primoIDKey: e})
            }
        }
        else if(categoria=="secondo") {

            this.setState({secondoPastoID:idPasto})

            var prevSecondoIDKey = this.state.secondoIDKey
            if (prevSecondoIDKey == null) {
                document.getElementById(e).style = selectedStyle
                this.setState({secondoIDKey: e})
                this.setState({secondoPastoNome: nomePasto})
            }
            else if (prevSecondoIDKey === e) {
                document.getElementById(e).style = ""
                this.setState({secondoIDKey: null})
                this.setState({secondoPastoID:null})
                this.setState({secondoPastoNome: null})
            }else {
                document.getElementById(prevSecondoIDKey).style = prevStyle
                document.getElementById(e).style = selectedStyle
                this.setState({secondoIDKey: e})
            }
        }
        else if(categoria=="contorno") {

            this.setState({contornoPastoID:idPasto})

            var prevContornoIDKey= this.state.contornoIDKey
            if (prevContornoIDKey == null) {
                document.getElementById(e).style = selectedStyle
                this.setState({contornoIDKey: e})
                this.setState({contornoPastoNome: nomePasto})
            }
            else if (prevContornoIDKey === e) {
                document.getElementById(e).style = ""
                this.setState({contornoIDKey: null})
                this.setState({contornoPastoID:null})
                this.setState({contornoPastoNome: null})
            }else {
                document.getElementById(prevContornoIDKey).style = prevStyle
                document.getElementById(e).style = selectedStyle
                this.setState({contornoIDKey: e})
            }
        }
        else if(categoria=="frutta") {

            this.setState({fruttaPastoID:idPasto})

            var prevFruttaIDKey = this.state.fruttaIDKey
            if (prevFruttaIDKey == null) {
                document.getElementById(e).style = selectedStyle
                this.setState({fruttaIDKey: e})
                this.setState({fruttaPastoNome: nomePasto})
            }
            else if (prevFruttaIDKey === e) {
                document.getElementById(e).style = ""
                this.setState({fruttaIDKey: null})
                this.setState({fruttaPastoID:null})
                this.setState({fruttaPastoNome: null})

            }else {
                document.getElementById(prevFruttaIDKey).style = prevStyle
                document.getElementById(e).style = selectedStyle
                this.setState({fruttaIDKey: e})
            }
        }
        else if(categoria=="extra") {

            if(!this.state.extraPastoIDs.includes(idPasto))
            {
                let arrayPastoIDs = this.state.extraPastoIDs
                arrayPastoIDs.push(idPasto)
                this.setState({extraPastoIDs:arrayPastoIDs})
                let arrayIDKeys = this.state.extrasIDKeys
                arrayIDKeys.push(e)
                this.setState({extrasIDKeys:arrayIDKeys})
                document.getElementById(e).style = selectedStyle

                let arrayNomiPastiExtra = this.state.extraPastiNomi
                arrayNomiPastiExtra.push(nomePasto)
                this.setState({extraPastiNomi:arrayNomiPastiExtra})
            }

            else if( this.state.extrasIDKeys.includes(e))
            {
                document.getElementById(e).style = ""
                var arrayKeys = this.state.extrasIDKeys
                var arrayIDs = this.state.extraPastoIDs
                var arrayNomi = this.state.extraPastiNomi
                var indexKeys = arrayKeys.indexOf(e);
                var indexIDs = arrayIDs.indexOf(idPasto);
                var indexNomi = arrayNomi.indexOf(nomePasto);

                    arrayKeys.splice(indexKeys, 1);
                    arrayIDs.splice(indexIDs, 1);
                    arrayNomi.splice(indexNomi,1)

                this.setState({extrasIDKeys:arrayKeys})
                this.setState({extraPastoIDs:arrayIDs})
                this.setState({extraPastiNomi:arrayNomi})
            }
        }
    }

    onClickConfermaComposizione()
    {
        let arrayComposizione = []
        let arrayNomiPasti = []
        let primo = this.state.primoPastoID
        let secondo = this.state.secondoPastoID
        let contorno = this.state.contornoPastoID
        let frutta = this.state.fruttaPastoID
        let extras = this.state.extraPastoIDs

        let primoNome = this.state.primoPastoNome
        let secondoNome = this.state.secondoPastoNome
        let contornoNome = this.state.contornoPastoNome
        let fruttaNome = this.state.fruttaPastoNome
        let extrasNomi = this.state.extraPastiNomi

        let prezzoTotale = 3

        if(primo!=null) {
            arrayComposizione.push(primo)
            arrayNomiPasti.push(primoNome)
        }
        if(secondo!=null)
        {
            arrayComposizione.push(secondo)
            arrayNomiPasti.push(secondoNome)
        }
        if(contorno!=null)
        {
            arrayComposizione.push(contorno)
            arrayNomiPasti.push(contornoNome)
        }
        if(frutta!=null)
        {
            arrayComposizione.push(frutta)
            arrayNomiPasti.push(fruttaNome)
        }

        if(arrayComposizione.length==0)
            prezzoTotale=0

        if(extras!=null) {
            prezzoTotale += extras.length
            arrayComposizione = arrayComposizione.concat(extras)
            arrayNomiPasti = arrayNomiPasti.concat(extrasNomi)
        }

        //TODO migliorare la gestione dell'errore di selezione minima
        if(prezzoTotale==0) {
            let parentContainer = document.getElementsByClassName("sp-buttonContainer")[0]

            if(parentContainer.childNodes.length<3) {
                let errorChild = document.createElement('h4')
                errorChild.textContent = "Seleziona almeno un elemento dal menu"
                errorChild.style = "color:red;margin-top:10px"
                parentContainer.appendChild(errorChild)
            }

            return
        }
        let boolPranzo
        if(this.state.boolOrdine=="pranzo")
            boolPranzo = true
        else if(this.state.boolOrdine=="cena")
            boolPranzo = false

        const objOrdine = {
            nomePiatti:arrayNomiPasti,
            idPiatti:arrayComposizione,
            prezzoTotale:prezzoTotale,
            boolPranzo: boolPranzo,
        }

        localStorage.setItem("ordine",JSON.stringify(objOrdine))
        window.location.href="/gestioneOrdinePasto/pagamentoOrdine"
    }

    imageNameTextTransform(nomePasto)
    {
        return nomePasto.split(' ').join('_').toLowerCase()
    }

    onMouseEnterElement(e)
    {
        if(document.getElementById(e).style.borderColor=="black")
            document.getElementById(e).style.borderColor="black"
        else
            document.getElementById(e).style="box-shadow: 0px 4px 16px rgb(0 0 0 / 30%);background:#F0F0F0"
    }

    onMouseLeaveElement(e)
    {
        if(!(document.getElementById(e).style.borderColor=="black"))
            document.getElementById(e).style="background:white"
        else if(document.getElementById(e).style.borderColor=="grey")
            document.getElementById(e).style="background:white"
    }

    render() {
        return (

            //TODO sticky navPortata
            <div className="root">
                <div className="sp-selectTipoMenuContainer">
                    <h3>Tipo di menù ordinabile</h3>
                    <FormSelect className="sp-selectTipoMenu" onChange={this.onChangeTipoMenu}>
                        <option value="pranzo">Pranzo</option>
                        <option value="cena">Cena</option>
                    </FormSelect>
                </div>
                <div className="sp-selectOrderContainer">
                    <div className="sp-navPortata">
                        <div className="hvr-grow sp-navPortataElement">
                            <a href="#PrimoLabel">Primo</a>
                        </div>
                        <div className="hvr-grow sp-navPortataElement">
                            <a href="#SecondoLabel">Secondo</a>
                        </div>
                        <div className="hvr-grow sp-navPortataElement">
                            <a href="#ContornoLabel">Contorno</a>
                        </div>
                        <div className="hvr-grow sp-navPortataElement">
                            <a href="#FruttaLabel">Frutta</a>
                        </div>
                        <div className="hvr-grow sp-navPortataElement">
                            <a href="#ExtraLabel">Extra</a>
                        </div>
                        <div className="hvr-grow sp-navPortataElement">
                            <a href="#ConfermaOrdineLabel">Conferma</a>
                        </div>
                    </div>
                    <hr className="sp-separationLine"/>
                    <div className="sp-mainSection">
                        <a id="PrimoLabel"></a>
                        <h3 className="sp-portataLabel">Primo</h3>
                        <div className="sp-categoryBlock">
                        {
                            this.state.pasti.map((pasto,i) => {
                                if(pasto.categoria=="primo")
                                    return (
                                        <div id={i} key={i} className="sp-categoryBlockElement" onMouseLeave={() => this.onMouseLeaveElement(i)} onMouseEnter={() => this.onMouseEnterElement(i)} onClick={() => this.onClickSelectPasto(pasto.id,pasto.nome,"primo",i)}>
                                                <div className="sp-leftBlock">
                                                        <div className="sp-insideBlockElement">
                                                            <div className="sp-elementTitle">
                                                                {pasto.nome}
                                                            </div>
                                                            <div className="sp-elementDescription">
                                                                {pasto.descrizione}
                                                            </div>
                                                            <div className="sp-elementIngredients">
                                                                {pasto.ingredienti}
                                                            </div>
                                                        </div>
                                                </div>
                                                <div className="sp-rightBlock">
                                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto.nome)+".jpg"} />
                                                </div>
                                        </div>
                                        )
                        })
                        }
                        </div>

                        <a id="SecondoLabel"></a>
                        <h3 className="sp-portataLabel">Secondo</h3>
                        <div className="sp-categoryBlock">
                            {
                                this.state.pasti.map( (pasto,i) => {
                                    if(pasto.categoria=="secondo")
                                        return (
                                            <div id={i} key={i} className="sp-categoryBlockElement" onMouseLeave={() => this.onMouseLeaveElement(i)} onMouseEnter={() => this.onMouseEnterElement(i)} onClick={() => this.onClickSelectPasto(pasto.id,pasto.nome,"secondo",i)}>
                                                <div className="sp-leftBlock">
                                                    <div className="sp-insideBlockElement">
                                                        <div className="sp-elementTitle">
                                                            {pasto.nome}
                                                        </div>
                                                        <div className="sp-elementDescription">
                                                            {pasto.descrizione}
                                                        </div>
                                                        <div className="sp-elementIngredients">
                                                            {pasto.ingredienti}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sp-rightBlock">
                                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto.nome)+".jpg"} />
                                                </div>
                                            </div>)
                                })
                            }
                        </div>
                        <a id="ContornoLabel"></a>
                        <h3 className="sp-portataLabel">Contorno</h3>
                        <div className="sp-categoryBlock">
                            {
                                this.state.pasti.map((pasto,i) =>{
                                    if(pasto.categoria=="contorno")
                                        return (
                                            <div id={i} key={i} className="sp-categoryBlockElement" onMouseLeave={() => this.onMouseLeaveElement(i)} onMouseEnter={() => this.onMouseEnterElement(i)} onClick={() => this.onClickSelectPasto(pasto.id,pasto.nome,"contorno",i)}>
                                                <div className="sp-leftBlock">
                                                    <div className="sp-insideBlockElement">
                                                        <div className="sp-elementTitle">
                                                            {pasto.nome}
                                                        </div>
                                                        <div className="sp-elementDescription">
                                                            {pasto.descrizione}
                                                        </div>
                                                        <div className="sp-elementIngredients">
                                                            {pasto.ingredienti}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sp-rightBlock">
                                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto.nome)+".jpg"} />
                                                </div>
                                            </div>)
                                })
                            }
                        </div>
                        <a id="FruttaLabel"></a>
                        <h3 className="sp-portataLabel">Frutta</h3>
                        <div className="sp-categoryBlock">
                            {
                                this.state.pasti.map( (pasto,i) =>{
                                    if(pasto.categoria=="frutta")
                                        return (
                                            <div id={i} key={i} className="sp-categoryBlockElement" onMouseLeave={() => this.onMouseLeaveElement(i)} onMouseEnter={() => this.onMouseEnterElement(i)} onClick={() => this.onClickSelectPasto(pasto.id,pasto.nome,"frutta",i)}>
                                                <div className="sp-leftBlock">
                                                    <div className="sp-insideBlockElement">
                                                        <div className="sp-elementTitle">
                                                            {pasto.nome}
                                                        </div>
                                                        <div className="sp-elementDescription">
                                                            {pasto.descrizione}
                                                        </div>
                                                        <div className="sp-elementIngredients">
                                                            {pasto.ingredienti}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sp-rightBlock">
                                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto.nome)+".jpg"} />
                                                </div>
                                            </div>)
                                })
                            }
                        </div>
                        <a id="ExtraLabel"></a>
                        <h3 className="sp-portataLabel">Extra</h3>
                        <div className="sp-categoryBlock">
                            {
                                this.state.pasti.map( (pasto,i) =>{
                                    if(pasto.categoria=="extra")
                                        return (
                                            <div id={i} key={i} className="sp-categoryBlockElement" onMouseLeave={() => this.onMouseLeaveElement(i)} onMouseEnter={() => this.onMouseEnterElement(i)} onClick={() => this.onClickSelectPasto(pasto.id,pasto.nome,"extra",i)}>
                                                <div className="sp-leftBlock">
                                                    <div className="sp-insideBlockElement">
                                                        <div className="sp-elementTitle">
                                                            {pasto.nome}
                                                        </div>
                                                        <div className="sp-elementDescription">
                                                            {pasto.descrizione}
                                                        </div>
                                                        <div className="sp-elementIngredients">
                                                            {pasto.ingredienti}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sp-rightBlock">
                                                    <img src={"../immaginiPasti/"+this.imageNameTextTransform(pasto.nome)+".jpg"} />
                                                </div>
                                            </div>)
                                })
                            }
                        </div>
                        <div className="sp-buttonContainer">
                            <a id="ConfermaOrdineLabel"></a>
                            <div>
                                <Button className="sp-buttonConferma" onClick={this.onClickConfermaComposizione}>Conferma ordine</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}