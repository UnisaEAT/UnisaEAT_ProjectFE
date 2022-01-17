import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'

//app functions
import Homepage from "./views/components/App/Homepage";

//class
import VisualizzazioneMenu from "./views/components/gestioneMenu/VisualizzazioneMenu";
import Prova from "./views/components/gestioneMenu/Prova";
import InserimentoMenu from "./views/components/gestioneMenu/InserimentoMenu";
import ModificaMenu from "./views/components/gestioneMenu/ModificaMenu";


class App extends Component {
  render() {
    return (
        <div>
              <Switch>
                  <Route exact path={["/"]} component={Homepage}/>
                  <Route exact path={["/InserimentoMenu"]} component={InserimentoMenu}/>
                  <Route exact path={["/VisualizzazioneMenu"]} component={VisualizzazioneMenu}/>
                  <Route exact path={["/Prova"]} component={Prova}/>
                  <Route exact path={["/ModificaMenu"]} component={ModificaMenu}/>
              </Switch>
        </div>
    );
  }
}

export default App;