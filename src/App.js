import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./views/navbar";
import login from "./views/login";
import { Switch, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
        <div>
          <Navbar/>
          <Switch>
            <Route exact path={["/login", "/views"]} component={login}/>
          </Switch>
        </div>
    );
  }
}

export default App;