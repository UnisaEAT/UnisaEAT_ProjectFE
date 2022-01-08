import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'

//app functions
import Homepage from "./views/components/App/Homepage";
import NavbarApp from "./views/components/App/NavbarApp";

//class
import RichiestaTesserino from "./views/components/gestioneTesserino/richiestaTesserino";
import RinnovoTesserino from "./views/components/gestioneTesserino/rinnovoTesserino";
import VisualizzaSaldo from "./views/components/gestioneTesserino/visualizzaSaldo";
import RicaricaTesserino from "./views/components/gestioneTesserino/ricaricaTesserino";
import Profilo from "./views/components/gestioneProfilo/profilo";
import InserimentoPersonale from "./views/components/gestionePersonale/InserimentoPersonale";
import VisualizzazioneListaPersonale from "./views/components/gestionePersonale/VisualizzazioneListaPersonale";
import RimozionePersonale from "./views/components/gestionePersonale/RimozionePersonale";
import SceltaPasti from "./views/components/gestioneOrdinePasto/sceltaPasti";

//Autenticazione
import Login from "./views/components/gestioneLogin/login";
import Logout from "./views/components/gestioneLogin/logout";

class App extends Component {
  render() {
    return (
        <div>
              <Switch>
                  <Route exact path={["/"]} component={Homepage}/>
                  <Route exact path={["/gestioneTesserino/richiestaTesserino"]} component={RichiestaTesserino}/>
                  <Route exact path={["/gestioneTesserino/rinnovoTesserino"]} component={RinnovoTesserino}/>
                  <Route exact path={["/gestioneTesserino/ricaricaTesserino"]} component={RicaricaTesserino}/>
                  <Route exact path={["/gestioneTesserino/visualizzaSaldo"]} component={VisualizzaSaldo}/>
                  <Route exact path={["/gestionePersonale/InserimentoPersonale"]} component={InserimentoPersonale}/>
                  <Route exact path={["/gestionePersonale/RimozionePersonale"]} component={RimozionePersonale}/>
                  <Route exact path={["/gestionePersonale/VisualizzazioneListaPersonale"]} component={VisualizzazioneListaPersonale}/>
                  <Route exact path={["/gestioneProfilo/profilo"]} component={Profilo}/>
                  <Route exact path={["/gestioneOrdinePasto/sceltaPasti"]} component={SceltaPasti}/>


                  <Route exact path={["/login"]} component={Login}/>
                  <Route exact path={["/logout"]} component={Logout}/>
              </Switch>
        </div>
    );
  }
}

export default App;