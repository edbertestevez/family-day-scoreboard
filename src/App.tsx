import React from "react";
import "fontsource-roboto";
import AppHeader from "./components/shared/AppHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/containers/Registration";
import Participants from "./components/containers/Participants";
import Scoreboard from "./components/containers/Scoreboard";
import Games from "./components/containers/Games";

function App() {
  return (
    <Router>
      <AppHeader />

      <Switch>
        <Route exact path="/">
          <Registration />
        </Route>
        <Route path="/participants">
          <Participants />
        </Route>
        <Route path="/scoreboard">
          <Scoreboard />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
