import React from 'react'

import "../../styles/gestioneMenu/VisualizzazioneMenu.css"
import axios from "axios";
import Categorie from "./Categorie";
export class VisualizzazioneMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            item:[]
        }
        this.filterItems = this.filterItems.bind(this)
    }
    filterItems(category) {
        const newItems = this.state.menu[0].pasti.filter((item) => item.categoria === category);
        this.setState({item: newItems})
    }

    componentDidMount() {
        console.log("uee")
        axios.post("http://localhost:8080/api/menu/VisualizzaMenu",{tipo:"Pranzo"})
            .then(response => {
                console.log(response.data)
                this.setState({menu: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const categorie = ["Primo", "Secondo", "Contorno", "Dolce"]

        return (
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
        );
    }
}

export default VisualizzazioneMenu