import React, {Component} from "react";
import Homepage from "./views/components/App/Homepage";

//classes
import InserimentoPersonale from "./views/components/GestionePersonale/InserimentoPersonale";
import VisualizzazioneListaPersonale from "./views/components/GestionePersonale/VisualizzazioneListaPersonale";

//functions
import RimozionePersonale from "./views/components/GestionePersonale/RimozionePersonale";
import VisualizzazioneMenu from "./views/components/App/GestioneMenu/VisualizzazioneMenu";
import { Switch, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
                <Switch>
                    <Route exact path={"/"} element={<Homepage/>}/>
                    <Route exact path={"/VisualizzazioneListaPersonale"} component={VisualizzazioneListaPersonale}/>
                    <Route exact path={"/InserimentoPersonale"} component={InserimentoPersonale}/>
                    <Route exact path={"/RimozionePersonale"} component={RimozionePersonale}/>
                    <Route exact path={"/VisualizzazioneMenu"} component={VisualizzazioneMenu}/>
                </Switch>
        );
    }
}

export default App;