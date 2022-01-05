import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Switch, Route } from 'react-router-dom'

import Homepage from "./views/homepage";
import NavbarApp from "./views/navbar";
import RichiestaTesserino from "./views/components/App/assets/gestioneTesserino/richiestaTesserino";
import RinnovoTesserino from "./views/components/App/assets/gestioneTesserino/rinnovoTesserino";
import RicaricaTesserino from "./views/components/App/assets/gestioneTesserino/ricaricaTesserino";
import VisualizzaSaldo from "./views/components/App/assets/gestioneTesserino/visualizzaSaldo";
import Profilo from "./views/components/App/assets/gestioneProfilo/profilo";
import Logout from "./views/components/App/assets/gestioneLogin/login";
import Login from "./views/components/App/assets/gestioneLogin/logout";
import InserimentoPersonale from "./views/components/App/assets/gestionePersonale/InserimentoPersonale";
import VisualizzazioneListaPersonale from "./views/components/App/assets/gestionePersonale/VisualizzazioneListaPersonale";
import RimozionePersonale from "./views/components/App/assets/gestionePersonale/RimozionePersonale";
import VisualizzazioneMenu from "./views/components/App/assets/gestioneMenu/VisualizzazioneMenu";

class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
              <Switch>

                  <Route exact path={["/"]} component={Homepage}/>
                  <Route exact path={["/gestioneTesserino/richiestaTesserino"]} component={RichiestaTesserino}/>
                  <Route exact path={["/gestioneTesserino/rinnovoTesserino"]} component={RinnovoTesserino}/>
                  <Route exact path={["/gestioneTesserino/ricaricaTesserino"]} component={RicaricaTesserino}/>
                  <Route exact path={["/gestioneTesserino/visualizzaSaldo"]} component={VisualizzaSaldo}/>
                  <Route exact path={["/gestionePersonale/inserimentoPersonale"]} component={InserimentoPersonale}/>
                  <Route exact path={["/gestionePersonale/visualizzazioneListaPersonale"]} component={VisualizzazioneListaPersonale}/>
                  <Route exact path={["/gestionePersonale/rimozionePersonale"]} component={RimozionePersonale}/>
                  <Route exact path={["/gestioneProfilo/profilo"]} component={Profilo}/>
                  <Route exact path={["/gestioneLogin/login"]} component={Login}/>
                  <Route exact path={["/gestioneLogin/logout"]} component={Logout}/>
                  <Route exact path={["/gestioneMenu/visualizzazioneMenu"]} component={VisualizzazioneMenu}/>
              </Switch>
        </div>
    );
  }
}

export default App;