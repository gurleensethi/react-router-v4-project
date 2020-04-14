import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { Players } from "./Players";
import { Teams } from "./Teams";
import { NavBar } from "./NavBar";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
        </Router>
      </div>
    );
  }
}

export default App;
