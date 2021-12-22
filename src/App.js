import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { Switch, Route } from 'react-router-dom'

import InserisciTesserino from "./views/inserisciTesserino";
import Homepage from "./views/homepage";
import NavbarApp from "./views/navbar";


class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
          <Switch>
              <Route exact path={["/", "/views"]} component={Homepage}/>
              <Route exact path={["/inserisciTesserino", "/views"]} component={InserisciTesserino}/>
          </Switch>
        </div>
    );
  }
}

export default App;