import React from 'react'

import "../../styles/gestioneMenu/InserimentoMenu.css"
import Categorie from "./Categorie";
import axios from "axios";
import FailurePopUp from "../App/failurePopUp"
import SuccessPopUp from "../App/successPopUp";
import {Button} from "react-bootstrap";


export class InserimentoMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pasti: [],
            item: [],
            ritornoPasti: [],
            popUp:false,
            failurePopUp: false,
            prova:true,
            value:props.location.state.value
        }
        this.filterItems = this.filterItems.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.closeFailurePopUp= this.closeFailurePopUp.bind(this)
    }

    closeFailurePopUp(){
        this.setState({failurePopUp: false})
        window.location.reload()
    }

    closePopUp() {
        this.setState({popUp: false})
        this.setState({ritornoPasti: null})
        window.location.reload()
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
            console.log(newItems)
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

    Inserimento(){
            axios.post("http://localhost:8080/api/menu/InserisciMenu", {
                tipo: this.state.value,
                pasti: this.state.ritornoPasti
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data.message === true) {
                        console.log("GOOD")
                        this.setState({popUp: true})
                    } else {
                        console.log("BAD")
                        this.setState({failurePopUp: true})
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    imageNameTextTransform(nomePasto)
    {
        return nomePasto.split(' ').join('_').toLowerCase()
    }


    render() {
        const categorie = ["primo", "secondo", "contorno", "extra"]
        return (
            <div id="root">
                {this.state.failurePopUp && <FailurePopUp message="Impossibile inserire il menu, è già presente per questa data." handleClose={this.closeFailurePopUp}/>}
                {this.state.popUp && <SuccessPopUp message="Inserimento Menu avvenuto con successo!" handleClose={this.closePopUp}/>}

                   <section className="menu-section">
                <div>
                    <h1 className="home_title">Scegli i Pasti</h1>
                    <h5 className="home_title_2">Clicca sui pasti per inserirli nel menù</h5>
                    <div className="underLine"/>
                </div>
                <Categorie filterItems={this.filterItems} categorie={categorie}/>
                <div className="section-center">

                    {this.state.item.map((menuItem, i) => {
                        return (
                            <article key={i} className="menu-item">
                                <img onClick={()=>this.insertPasto(menuItem)} src={"../immaginiPasti/"+this.imageNameTextTransform(menuItem.nome)+".jpg"} alt={menuItem.categoria} className="photo cursor-pointer"/>
                                <div className="item-info">
                                    <header>
                                        <h3 className="title" >{menuItem.nome}
                                        </h3>
                                    </header>
                                    <p className="item-text2">{menuItem.descrizione}</p>
                                    <p>Ingredienti:{menuItem.ingredienti}</p>

                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
                <Button variant="outline-primary" className="buttonInsert mt-5 mb-5"  onClick={()=>this.Inserimento()}>
                    Inserisci Menu
                </Button>
            </div>
        );
    }
}

export default InserimentoMenu