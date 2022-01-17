import React from 'react'

import "../../styles/gestioneMenu/VisualizzazioneMenu.css"
import axios from "axios";
import Categorie from "./Categorie";
import {Form} from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {Redirect} from "react-router-dom";
import Popup from "./PopUp";
export class ModificaMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            item:[],
            ritornoPasti:[],
            nome:'',
            descrizione:'',
            ingredienti:'',
            popUp: false,
        }
        this.filterItems = this.filterItems.bind(this)
        this.onChangeNome = this.onChangeNome.bind(this)
        this.onChangeDescrizione = this.onChangeDescrizione.bind(this)
        this.onChangeIngredienti = this.onChangeIngredienti.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    closePopUp() {
        this.setState({popUp: true})
        this.setState({ritornoPasti: null})
        window.location.reload();
    }


    onChangeNome(e,i) {
        this.setState({
            nome: e.target.value
        })
        this.state.menu[i].nome=this.state.nome
        console.log(e.target.value)
    }

    onChangeDescrizione(e,i) {
        this.setState({
            descrizione: e.target.value
        })
        console.log(this.state.descrizione)
        this.state.menu[i].descrizione=this.state.descrizione
    }

    onChangeIngredienti(e,i) {
        this.setState({
            ingredienti: e.target.value
        })

        this.state.menu[i].ingredienti=this.state.ingredienti
    }

    filterItems(e,category) {
        const newItems = this.state.menu.filter((item) => item.categoria === category);
        this.setState({item: newItems})
    }

    componentDidMount() {
        axios.post("http://localhost:8080/api/menu/VisualizzaMenu",{tipo:"Pranzo"})
            .then(response => {
                console.log(response.data)
                this.setState({menu: response.data[0].pasti})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    Modifica() {
        console.log("uee")
        axios.post("http://localhost:8080/api/menu/modificaMenu",{tipo:"Pranzo",pasti:this.state.menu})
            .then(response => {
                if(response.data.message===true){
                    this.setState({popUp: true})
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
                    <h1 className="home_title">Il Menu del giorno</h1>
                    <div className="underLine"/>
                </div>
                <Categorie filterItems={this.filterItems} categorie={categorie}/>
                <div className="section-center">
                    {this.state.item.map((menuItem, i) => {
                        return (
                            <article key={i} className="menu-item">
                                <img src={"../ImmaginiPasti/"+menuItem.nome+".jpg"} alt={menuItem.categoria} className="photo"/>
                                 <div className="item-info">
                                     <TextField
                                         id="outlined-textarea"
                                         label="Descrizione Pasto" onChange={(e)=>this.onChangeDescrizione(e,i)} placeholder={menuItem.descrizione} className="title" />
                                     <Form.Control as="textarea" rows={2} onChange={(e)=>this.onChangeIngredienti(e,i)} on placeholder={"Ingredienti: "+menuItem.ingredienti}/>
                                </div>

                            </article>
                        )
                    })}
                </div>
            </section>
        <Button className="buttonInsert" variant="contained" endIcon={<SendIcon />} onClick={()=>this.Modifica()}>
            Modifica Menu
        </Button>
        </div>
        );
    }
}

export default ModificaMenu