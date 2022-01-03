import React, {Component} from "react";


//classes
import InserimentoPersonale from "./views/components/GestionePersonale/InserimentoPersonale";
import VisualizzazioneListaPersonale from "./views/components/GestionePersonale/VisualizzazioneListaPersonale";

//functions
import Homepage from "./views/components/App/Homepage";
import RimozionePersonale from "./views/components/GestionePersonale/RimozionePersonale";

import { Switch, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={Homepage}/>
                <Route exact path={"/VisualizzazioneListaPersonale"} component={VisualizzazioneListaPersonale}/>
                <Route exact path={"/InserimentoPersonale"} component={InserimentoPersonale}/>
                <Route exact path={"/RimozionePersonale"} component={RimozionePersonale}/>
            </Switch>
        );
    }
}

export default App;