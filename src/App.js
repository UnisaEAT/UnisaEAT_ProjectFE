import React, {Component} from "react";
import Homepage from "./views/components/App/Homepage";
import InserimentoPersonale from "./views/components/GestionePersonale/InserimentoPersonale";
import VisualizzazioneListaPersonale from "./views/components/GestionePersonale/VisualizzazioneListaPersonale";
import RimozionePersonale from "./views/components/GestionePersonale/RimozionePersonale";
import {VisualizzazioneMenu} from "./views/components/App/GestioneMenu/VisualizzazioneMenu";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import BrowserRouter from "react-router-dom/es/BrowserRouter";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/VisualizzazioneListaPersonale"} element={<VisualizzazioneListaPersonale/>}/>
                    <Route exact path={"/InserimentoPersonale"} element={<InserimentoPersonale/>}/>
                    <Route exact path={"/RimozionePersonale"} element={<RimozionePersonale/>}/>
                    <Route exact path={"/VisualizzazioneMenu"} element={<VisualizzazioneMenu/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;