import React, { Component } from "react";
import Homepage from "./views/Homepage";
import RimozionePersonale from "./views/RimozionePersonale";
import InserimentoPersonale from "./views/InserimentoPersonale";
import { Switch, Route } from 'react-router-dom'
import VisualizzazioneListaPersonale from "./views/VisualizzazioneListaPersonale";
import InfoPersonale from "./views/InfoPersonale";

class App extends Component {
  render() {
    return (
        <div>
          <Switch>
              <Route exact path={"/"} component={Homepage}/>
              <Route exact path={"/VisualizzazioneListaPersonale"} component={VisualizzazioneListaPersonale}/>
              <Route exact path={"/InserimentoPersonale"} component={InserimentoPersonale}/>
              <Route exact path={"/RimozionePersonale"} component={RimozionePersonale}/>
              <Route exact path={"/InfoPersonale"} component={InfoPersonale}/>
          </Switch>
        </div>
    );
  }
}

export default App;