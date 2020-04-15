import React, { FunctionComponent } from "react";
import { Sidebar } from "./Sidebar";
import { RouteComponentProps, Route, Link } from "react-router-dom";
import { getTeamNames } from "../api";
import { TeamLogo } from "./TeamLogo";
import { Team } from "./Team";

export const Teams: FunctionComponent<RouteComponentProps> = (props) => {
  const [teams, setTeams] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    getTeamNames().then((names) => {
      setTeams(names);
      setLoading(false);
    });
  }, [props.location.search]);

  return (
    <div className="container two-column">
      <Sidebar list={teams} loading={isLoading} title="Title" />

      {!isLoading && (
        <Route
          exact
          path={`${props.match.url}`}
          render={() => (
            <div className="sidebar-instruction">Select a Team</div>
          )}
        />
      )}

      <Route
        path={`${props.match.url}/:teamId`}
        render={(props) => {
          if (isLoading) return null;
          const { teamId } = props.match.params;
          return (
            <div className="panel">
              <Team id={teamId}>
                {(team) =>
                  team === null ? (
                    <h1>LOADING</h1>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <TeamLogo id={team.id} className="center" />
                      <h1 className="medium-header">{team.name}</h1>
                      <ul className="info-list row">
                        <li>
                          Established <div>{team.established}</div>
                        </li>
                        <li>
                          Manager <div>{team.manager}</div>
                        </li>
                        <li>
                          Coach <div>{team.coach}</div>
                        </li>
                      </ul>
                      <Link
                        className="center btn-main"
                        to={`/${props.match.params.teamId}`}
                      >
                        {team.name} Team page
                      </Link>
                    </div>
                  )
                }
              </Team>
            </div>
          );
        }}
      />
    </div>
  );
};
