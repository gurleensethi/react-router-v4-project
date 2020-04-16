import React, { Component } from "react";
import { getArticle } from "../api";

export class Article extends Component<
  {
    articleId: string;
    teamId: string;
    children: (article: any) => React.ReactNode;
  },
  { article: any }
> {
  state = {
    article: null,
  };

  componentDidMount() {
    const { teamId, articleId } = this.props;
    getArticle(teamId, articleId).then((article) => {
      this.setState(() => ({ article }));
    });
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.articleId !== this.props.articleId ||
      prevProps.teamId !== this.props.teamId
    ) {
      this.setState(() => ({ article: null }));
      const { teamId, articleId } = this.props;
      getArticle(teamId, articleId).then((article) => {
        this.setState(() => ({ article }));
      });
    }
  };

  render() {
    return <div>{this.props.children(this.state.article)}</div>;
  }
}
