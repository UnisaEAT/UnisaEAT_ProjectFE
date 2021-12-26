import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { Switch, Route } from 'react-router-dom'

import Profilo from "./views/profilo";
import NavbarApp from "./views/navbar";

class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
              <Switch>
                  <Route exact path={["/profilo"]} component={Profilo}/>
              </Switch>
        </div>
    );
  }
}

export default App;