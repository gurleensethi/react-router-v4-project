import React, { FunctionComponent } from "react";
import { getPlayers } from "../api";
import { RouteComponentProps, Route, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import slug from "slug";

export const Players: FunctionComponent<RouteComponentProps> = (props) => {
  const [players, setPlayers] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    getPlayers(props.location.search).then((players) => {
      setPlayers(players);
      setLoading(false);
    });
  }, [props.location.search]);

  return (
    <div className="container two-column">
      <Sidebar
        title="Players"
        list={players.map((item) => item.name)}
        loading={isLoading}
      />

      {!isLoading && (
        <Route
          exact
          path={`${props.match.url}`}
          render={() => (
            <div className="sidebar-instruction">Select a Player</div>
          )}
        />
      )}

      <Route
        path={`${props.match.url}/:playerId`}
        render={(props) => {
          if (isLoading === true) return null;
          const {
            name,
            position,
            teamId,
            number,
            avatar,
            apg,
            ppg,
            rpg,
            spg,
          } = players.find(
            (player) => slug(player.name) === props.match.params.playerId
          );

          return (
            <div className="panel">
              <img
                className="avatar"
                src={`${avatar}`}
                alt={`${name}'s avatar`}
              />
              <h1 className="medium-header">{name}</h1>
              <h3 className="header">#{number}</h3>
              <div className="row">
                <ul className="info-list" style={{ marginRight: 10 }}>
                  <li>
                    Team
                    <div>
                      <Link to={`/${teamId}`} style={{ color: "#68809a" }}>
                        {teamId[0].toUpperCase() + teamId.slice(1)}
                      </Link>
                    </div>
                  </li>
                  <li>
                    Position
                    <div>{position}</div>
                  </li>
                  <li>
                    PPG
                    <div>{ppg}</div>
                  </li>
                </ul>
                <ul className="info-list">
                  <li>
                    SPG
                    <div>{spg}</div>
                  </li>
                  <li>
                    RPG
                    <div>{rpg}</div>
                  </li>
                  <li>
                    APG
                    <div>{apg}</div>
                  </li>
                </ul>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
