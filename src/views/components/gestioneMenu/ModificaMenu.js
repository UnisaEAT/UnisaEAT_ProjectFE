import React, {useState} from 'react'


import "../../styles/gestioneMenu/InserimentoMenu.css"
import axios from "axios";
import Categorie from "./Categorie";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import VisualizzazioneMenu from "./VisualizzazioneMenu";
import Popup from "./PopUp";

export class ModificaMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            item:[],
            ritornoPasti:[],
            popUp:false,
        }
        this.filterItems = this.filterItems.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    closePopUp() {
        this.setState({popUp: false})
        this.setState({ritornoPasti: null})
        window.location.reload();
    }

    filterItems(category) {
        const newItems = this.state.menu.filter((item) => item.categoria === category);
        this.setState({item: newItems})
    }

    modificaPasto(pasto){
        console.log(this.state.ritornoPasti)
        if(this.state.ritornoPasti.includes(pasto)){
            console.log("Pasto già inserito")
        }
        else{
            this.state.ritornoPasti.push(pasto)
            console.log(this.state.ritornoPasti.toString())
            this.setState({prova: true})
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/menu/SceltaMenu")
            .then(response => {
                console.log(response.data)
                this.setState({menu: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    Modifica() {
        console.log("uee")
        axios.post("http://localhost:8080/api/menu/modificaMenu",{tipo:"Pranzo",pasti:this.state.ritornoPasti})
            .then(response => {
                if(response.data.message==true){
                    this.setState({popUp:true})
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
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
            <section className="menu-section">
                <div>
                    <h1 className="home_title">Modifica Menu</h1>
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
                                        <h3 className="title" >{menuItem.nome}</h3>
                                        <button onClick={()=>this.modificaPasto(menuItem)} type="submit" className="btn-block btn-primary" >Scegli</button>
                                    </header>
                                    <h4 className="item-text2">{menuItem.descrizione}</h4>
                                    <p>Ingredienti:<hr/>{menuItem.ingredienti}</p>

                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        <Button className="buttonInsert" variant="contained" onClick={()=>this.Modifica()}>
            Modifica Menu
        </Button>
        </div>
        );
    }
}

export default ModificaMenu