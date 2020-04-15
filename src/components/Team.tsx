import React, { Component } from "react";
import { getTeam } from "../api";

export class Team extends Component<
  { id: string; children: (team: any) => React.ReactElement },
  { team: any }
> {
  state = {
    team: null,
  };

  componentDidMount() {
    this.fetchTeam(this.props.id);
  }

  componentDidUpdate(props) {
    if (this.props.id !== props.id) {
      this.fetchTeam(props.id);
    }
  }

  fetchTeam = (id) => {
    this.setState(() => ({ team: null }));
    getTeam(id).then((team) => this.setState(() => ({ team })));
  };

  render() {
    console.log("Rendering", JSON.stringify(this.props));
    const { children } = this.props;
    return <div>{children && children(this.state.team)}</div>;
  }
}
