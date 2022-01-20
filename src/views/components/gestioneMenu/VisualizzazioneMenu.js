import React from 'react'

import "../../styles/gestioneMenu/VisualizzazioneMenu.css"
import axios from "axios";
import Categorie from "./Categorie";
import {Dropdown,DropdownButton} from "react-bootstrap";
import FailurePopUp from "../App/failurePopUp";
export class VisualizzazioneMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            item:[],
            value:'',
            failurePopUp:false
        }
        this.filterItems = this.filterItems.bind(this)
        this.closeFailurePopUp= this.closeFailurePopUp.bind(this)
    }

    closeFailurePopUp(){
        this.setState({failurePopUp: false})
        window.location.reload()
    }

    filterItems(category) {
        let newItems = this.state.menu[0].pasti.filter((item) => item.categoria === category);
        if(newItems.length==0){
            newItems=[null]
        }
        this.setState({item: newItems})
    }

    someFunc(x) {
        if(x) this.state.value="Pranzo"
        else this.state.value="Cena"
        this.Visualizza()
    }

    Visualizza() {
        console.log(this.state.value)
        axios.post("http://localhost:8080/api/menu/visualizzaMenu",{tipo:this.state.value})
            .then(response => {
                if(response.data!=null){
                    console.log("ciao")
                this.setState({menu: response.data})}
                else{
                    this.setState({failurePopUp:true})
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const categorie = ["Primo", "Secondo", "Contorno", "Dolce"]

        return (
            <div>
                {this.state.failurePopUp && <FailurePopUp message={"Nessun Menu presente per la tipologia: "+this.state.value} handleClose={this.closeFailurePopUp}/>}
                <section className="menu-section">
                <div>
                    <h1 className="home_title">Il Menu del giorno</h1>
                    <div className="underLine"/>
                </div>
                <Categorie filterItems={this.filterItems} categorie={categorie}/>
                <div className="section-center">
                    {this.state.item.map((menuItem, i) => {
                        if(menuItem==null){
                            return(
                                <h1 className="h1Menu">Non ci sono pasti per questa categoria.</h1>
                            )
                        }
                        return (
                            <article key={i} className="menu-item">
                                <img src={"../ImmaginiPasti/"+menuItem.nome+".jpg"} alt={menuItem.categoria} className="photo"/>
                                <div className="item-info">
                                    <header>
                                        <h3 className="title" >{menuItem.nome}</h3>
                                    </header>
                                    <h4 className="item-text2">{menuItem.descrizione}</h4>
                                    <p>Ingredienti:<hr/>{menuItem.ingredienti}</p>

                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        <DropdownButton className="DropDownMenu" id="dropdown-item-button" title="Tipologia Menu">
            <Dropdown.Item onClick={()=>this.someFunc(true)} las="button">Pranzo</Dropdown.Item>
            <Dropdown.Item onClick={()=>this.someFunc(false)} las="button">Cena</Dropdown.Item>
        </DropdownButton>
        </div>
        );
    }
}

export default VisualizzazioneMenu