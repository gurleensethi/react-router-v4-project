import React, { FunctionComponent } from "react";
import { TeamLogo } from "./TeamLogo";
import { getTeamNames } from "../api";
import { Link } from "react-router-dom";

export const Home: FunctionComponent = (props) => {
  const [teamNames, setTeamNames] = React.useState<string[]>([]);
  React.useEffect(() => {
    getTeamNames().then((names) => setTeamNames(names));
  }, []);

  return (
    <div className="container">
      <h1 className="large-header">Hash History Basketball League</h1>
      <h3 className="header text-center">Select a team</h3>
      <div className="home-grid">
        {teamNames.map((id) => {
          return (
            <Link key={id} to={`/${id}`}>
              <TeamLogo id={id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
