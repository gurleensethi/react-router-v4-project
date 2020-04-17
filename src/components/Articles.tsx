import React, { Component } from "react";
import { getTeamsArticles } from "../api";
import { Sidebar } from "./Sidebar";
import { RouteComponentProps, Route } from "react-router-dom";
import { Article } from "./Article";
import { Loading } from "./Loading";

export class Articles extends Component<
  RouteComponentProps<{ teamId: string }>,
  { loading: boolean; articles: any[] }
> {
  state = {
    loading: true,
    articles: [],
  };

  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId).then((articles) => {
      this.setState(() => ({
        loading: false,
        articles: articles.map((article) => article.title),
      }));
    });
  }

  render() {
    const { loading, articles } = this.state;
    const { params, url } = this.props.match;
    const { teamId } = params;

    return (
      <div className="container two-column">
        <Sidebar
          loading={loading}
          title="Articles"
          list={articles}
          {...this.props}
        />

        <Route
          path={`${url}/:articleId`}
          render={({ match }) => (
            <Article articleId={match.params.articleId} teamId={teamId}>
              {(article) =>
                !article ? (
                  <Loading></Loading>
                ) : (
                  <article className="artilce" key={article.id}>
                    <h1 className="header">{article.title}</h1>
                    <p>{article.body}</p>
                  </article>
                )
              }
            </Article>
          )}
        />
      </div>
    );
  }
}
