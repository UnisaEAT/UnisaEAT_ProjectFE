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
       console.log("baaaaad")
    }

    closePopUp() {
        this.setState({popUp: false})
        this.setState({ritornoPasti: null})
        console.log("goooood")
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

    Inserimento(){
        console.log(this.state.ritornoPasti)
        axios.post("http://localhost:8080/api/menu/InserisciMenu",{tipo:this.state.value,pasti:this.state.ritornoPasti})
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


    render() {
        const categorie = ["Primo", "Secondo", "Contorno", "Dolce"]
        return (
            <div id="root">
                {this.state.popUp && <SuccessPopUp message="Inserimento Menu avvenuto con successo!" handleClose={this.closePopUp()}/>}
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
                                    <p>Ingredienti:{menuItem.ingredienti}</p>

                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
                <Button variant="outline-primary" className="buttonInsert"  onClick={()=>this.Inserimento()}>
                    Inserisci Menu
                </Button>
            </div>
        );
    }
}

export default InserimentoMenu