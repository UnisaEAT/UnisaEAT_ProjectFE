import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";


import { Switch, Route } from 'react-router-dom'

import Homepage from "./views/homepage";
import NavbarApp from "./views/navbar";
import InserisciTesserino from "./views/inserisciTesserino";
import RinnovoTesserino from "./views/rinnovoTesserino";
import RicaricaTesserino from "./views/ricaricaTesserino";
import VisualizzaSaldo from "./views/visualizzaSaldo";



class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
              <Switch>
                  <Route exact path={["/"]} component={Homepage}/>
                  <Route exact path={["/richiestaTesserino"]} component={InserisciTesserino}/>
                  <Route exact path={["/rinnovoTesserino"]} component={RinnovoTesserino}/>
                  <Route exact path={["/ricaricaTesserino"]} component={RicaricaTesserino}/>
                  <Route exact path={["/visualizzaSaldo"]} component={VisualizzaSaldo}/>
              </Switch>
        </div>
    );
  }
}

export default App;