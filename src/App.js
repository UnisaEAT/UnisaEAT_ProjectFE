import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { Switch, Route } from 'react-router-dom'

import Login from "./views/login";
import NavbarApp from "./views/navbar";

class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
              <Switch>
                  <Route exact path={["/login"]} component={Login}/>
              </Switch>
        </div>
    );
  }
}

export default App;