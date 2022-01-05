import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { Switch, Route } from 'react-router-dom'

import Login from "./views/login";
import NavbarApp from "./views/navbar";
import Profilo from "./views/profilo";
import Logout from "./views/logout";

class App extends Component {
  render() {
    return (
        <div>
            <NavbarApp/>
              <Switch>
                  <Route exact path={["/login"]} component={Login}/>
                  <Route exact path={["/profilo"]} component={Profilo}/>
                  <Route exact path={["/logout"]} component={Logout}/>
              </Switch>
        </div>
    );
  }
}

export default App;