import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import navbar from "./views/navbar";
import inserisciPersonale from "./views/inserisciPersonale";
import { Switch, Route } from 'react-router-dom'
import Navbar from "./views/navbar";
class App extends Component {
  render() {
    return (
        <div>
        <Navbar />
          <Switch>
            <Route exact path={["/", "/views"]} component={navbar}/>
            <Route exact path={["/inserisciPersonale", "/views"]} component={inserisciPersonale}/>
          </Switch>
        </div>
    );
  }
}

export default App;