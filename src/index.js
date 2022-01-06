import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { Switch, Route } from 'react-router-dom'
import NavbarApp from "./views/navbar";
import InserimentoFAQ from "./views/components/gestioneFAQ/inserimentoFAQ"

class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
              <Switch>
                  <Route exact path={["/gestioneFAQ/inserimentoFAQ"]} component={InserimentoFAQ}/>
              </Switch>
        </div>
    );
  }
}

export default App;