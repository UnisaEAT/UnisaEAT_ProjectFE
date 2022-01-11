import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'

//app functions
import Homepage from "./views/components/App/Homepage";
import NavbarApp from "./views/components/App/NavbarApp";

//class

import StatisticheSettimanali from "./views/components/gestioneStatistiche/statisticheSettimanali";

//Autenticazione
import Login from "./views/components/gestioneLogin/login";
import Logout from "./views/components/gestioneLogin/logout";

class App extends Component {
  render() {
    return (
        <div>
              <Switch>
                  <Route exact path={["/statisticheSettimanali"]} component={StatisticheSettimanali}/>
              </Switch>
        </div>
    );
  }
}

export default App;