import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Players } from "./Players";
import { Teams } from "./Teams";
import { NavBar } from "./NavBar";
import { TeamPage } from "./TeamPage";
import { Articles } from "./Articles";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route path="/:teamId" exact component={TeamPage} />
            <Route path="/:teamId/articles" component={Articles} />
            <Route
              render={() => <h1 className="text-center">Four oh Four.</h1>}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
