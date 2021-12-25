import React, {Component} from "react";
import Homepage from "./views/components/App/Homepage";
import InserimentoPersonale from "./views/components/GestionePersonale/InserimentoPersonale";
import {Switch, Route} from 'react-router-dom'
import VisualizzazioneListaPersonale from "./views/components/GestionePersonale/VisualizzazioneListaPersonale";
import RimozionePersonale from "./views/components/GestionePersonale/RimozionePersonale";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={"/"} component={Homepage}/>
                    <Route exact path={"/VisualizzazioneListaPersonale"} component={VisualizzazioneListaPersonale}/>
                    <Route exact path={"/InserimentoPersonale"} component={InserimentoPersonale}/>
                    <Route exact path={"/RimozionePersonale"} component={RimozionePersonale}/>
                </Switch>
            </div>
        );
    }
}

export default App;