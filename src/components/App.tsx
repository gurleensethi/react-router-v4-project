import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./NavBar";
import { dynamicImport } from "./DynamicImport";

const Players = dynamicImport(() => import("./Players"));
const Teams = dynamicImport(() => import("./Teams"));
const TeamPage = dynamicImport(() => import("./TeamPage"));
const Articles = dynamicImport(() => import("./Articles"));
const Home = dynamicImport(() => import("./Home"));

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
