import React, { Component } from "react";
import { getTeamsArticles, getTeamNames } from "../api";
import { TeamLogo } from "./TeamLogo";
import slug from "slug";
import { Team } from "./Team";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";

interface State {
  loading: boolean;
  articles: any[];
  teamNames: string[];
}

export default class TeamPage extends Component<
  RouteComponentProps<{ teamId: string }>,
  State
> {
  state: State = {
    loading: true,
    articles: [],
    teamNames: [],
  };

  componentDidMount() {
    Promise.all([
      getTeamNames(),
      getTeamsArticles(this.props.match.params.teamId),
    ]).then(([teamNames, articles]) => {
      this.setState(() => ({ loading: false, articles, teamNames }));
    });
  }

  render() {
    const { loading, articles, teamNames } = this.state;
    const { match } = this.props;
    const { teamId } = match.params;

    if (loading === false && teamNames.includes(teamId) === false) {
      return <Redirect to="" />;
    }

    return (
      <div>
        <Team id={teamId}>
          {(team) =>
            team === null ? (
              <h1>Loading...</h1>
            ) : (
              <div className="panel">
                <TeamLogo id={teamId} />
                <h1 className="medium-header">{team.name}</h1>
                <h4 style={{ margin: 5 }}>
                  <Link
                    style={{ cursor: "pointer" }}
                    to={{
                      pathname: "/players",
                      search: `?teamId=${teamId}`,
                    }}
                  >
                    View Roster
                  </Link>
                </h4>
                <ul className="championships">
                  {team.championships.map((ship) => (
                    <li key={ship}>{ship}</li>
                  ))}
                </ul>
                <h2 className="header">Articles</h2>
                <ul className="articles">
                  {articles.map((article) => (
                    <li key={article.id}>
                      <Link to={`${match.url}/articles/${slug(article.title)}`}>
                        <h4 className="article-title">{article.title}</h4>
                        <div className="article-date">
                          {article.date.toLocaleDateString()}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        </Team>
      </div>
    );
  }
}
