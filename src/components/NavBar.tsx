import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const NavBar: FunctionComponent = (props) => {
  return (
    <div className="container navbar">
      <Link to="/">Home</Link>
      <nav className="nav-links">
        <Link to="/teams">Teams</Link>
        <Link to="/players">Players</Link>
      </nav>
    </div>
  );
};
