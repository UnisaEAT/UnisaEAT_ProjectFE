import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom'

//classes
import InserimentoPersonale from "./views/components/GestionePersonale/InserimentoPersonale";
import VisualizzazioneListaPersonale from "./views/components/GestionePersonale/VisualizzazioneListaPersonale";
import RimozionePersonale from "./views/components/GestionePersonale/RimozionePersonale";
import VisualizzazioneMenu from "./views/components/GestioneMenu/VisualizzazioneMenu";
import InserimentoMenu from "./views/components/GestioneMenu/InserimentoMenu";

//functions
import Homepage from "./views/components/App/Homepage";
import Prova from "./views/components/GestioneMenu/Prova";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={Homepage}/>
                <Route exact path={"/VisualizzazioneListaPersonale"} component={VisualizzazioneListaPersonale}/>
                <Route exact path={"/InserimentoPersonale"} component={InserimentoPersonale}/>
                <Route exact path={"/RimozionePersonale"} component={RimozionePersonale}/>
                <Route exact path={"/InserimentoMenu"} component={InserimentoMenu}/>
                <Route exact path={"/VisualizzazioneMenu"} component={VisualizzazioneMenu}/>
                <Route exact path={"/Prova"} component={Prova}/>
            </Switch>
        );
    }
}

export default App;