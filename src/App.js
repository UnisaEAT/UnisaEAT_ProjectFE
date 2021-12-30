import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Switch, Route } from 'react-router-dom'

import Homepage from "./views/homepage";
import NavbarApp from "./views/navbar";
import RichiestaTesserino from "./views/gestioneTesserino/richiestaTesserino";
import RinnovoTesserino from "./views/gestioneTesserino/rinnovoTesserino";
import RicaricaTesserino from "./views/gestioneTesserino/ricaricaTesserino";
import VisualizzaSaldo from "./views/gestioneTesserino/visualizzaSaldo";
import Profilo from "./views/profilo";


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
                  <Route exact path={["/profilo"]} component={Profilo}/>
              </Switch>
        </div>
    );
  }
}

export default App;