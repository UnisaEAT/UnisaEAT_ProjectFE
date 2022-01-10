import React from 'react'

import "../../styles/InserimentoMenu.css"
import Categorie from "./Categorie";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import {Button} from "@mui/material";
import Popup from "../GestionePersonale/PopUp";
import {Redirect} from "react-router-dom";

export class InserimentoMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pasti: [],
            item: [],
            ritornoPasti: [],
            popUp:false,
            prova:true,
        }
        this.filterItems = this.filterItems.bind(this)
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    closePopUp() {
        this.setState({popUp: false})
        this.setState({ritornoPasti: null})
        window.location.reload();
        return
        (<Redirect to="/VisualizzazioneMenu"/>)
    }


    insertPasto(pasto){
        console.log(this.state.ritornoPasti)
        if(this.state.ritornoPasti.includes(pasto)){
            console.log("Pasto già inserito")
            this.setState({prova: false})
        }
        else{
        this.state.ritornoPasti.push(pasto)
        console.log(this.state.ritornoPasti.toString())
            this.setState({prova: true})
        }
    }

    filterItems(category) {
            const newItems = this.state.pasti.filter((item) => item.categoria === category);
            this.setState({item: newItems})
        }

    componentDidMount() {
        axios.get("http://localhost:8080/api/menu/SceltaMenu")
            .then(response => {
                console.log(response.data)
                this.setState({pasti: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    errorHandler(error) {
        let inputError = error.name;
        let errorMessage = error.message;
        const rootElement = document.getElementById(inputError)

        if (rootElement.childNodes.length < 3) {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    Inserimento(){
        console.log(this.state.ritornoPasti)
        axios.post("http://localhost:8080/api/menu/InserisciMenu",{tipo:"Pranzo",pasti:this.state.ritornoPasti})
            .then(response => {
                console.log(response.data)
                if (response.data.message === true) {
                    this.setState({popUp: true})
                } else if (response.data.name != null)
                    this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        const categorie = ["Primo", "Secondo", "Contorno", "Dolce"]

        return (
            <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
            <section className="menu-section">
                <div>
                    <h1 className="home_title">Scegli i Pasti</h1>
                    <div className="underLine"/>
                </div>
                <Categorie filterItems={this.filterItems} categorie={categorie}/>
                <div className="section-center">
                    {this.state.item.map((menuItem, i) => {
                        return (
                            <article key={i} className="menu-item">
                                    <img src={"../ImmaginiPasti/"+menuItem.nome+".jpg"} alt={menuItem.categoria} className="photo"/>
                                <div className="item-info">
                                    <header>
                                        <h3 className="title" >{menuItem.nome}
                                            <button onClick={()=>this.insertPasto(menuItem)} type="submit" className="btn-blockMenu btn-primary" >Inserisci</button>
                                        </h3>
                                    </header>
                                    <h4 className="item-text2">{menuItem.descrizione}</h4>
                                    <p>Ingredienti:<hr/>{menuItem.ingredienti}</p>

                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
                <Button className="buttonInsert" variant="contained" endIcon={<SendIcon />} onClick={()=>this.Inserimento()}>
                    Inserisci Menu
                </Button>
            </div>
        );
    }
}

export default InserimentoMenu