import React, { Component } from "react";
import RimozionePersonale from "./views/RimozionePersonale";
import InserimentoPersonale from "./views/InserimentoPersonale";
import { Switch, Route } from 'react-router-dom'
import Homepage from "./views/Homepage";
class App extends Component {
  render() {
    return (
        <div>
          <Switch>
              <Route exact path={"/"} component={Homepage}/>
              <Route exact path={"/InserimentoPersonale"} component={InserimentoPersonale}/>
              <Route exact path={"/RimozionePersonale"} component={RimozionePersonale}/>
          </Switch>
        </div>
    );
  }
}

export default App;