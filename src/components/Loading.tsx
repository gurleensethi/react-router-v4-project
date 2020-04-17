import React, { Component } from "react";

export class Loading extends Component<{ text: string }, { text: string }> {
  state = {
    text: this.props.text,
  };

  public static defaultProps = {
    text: "Loading",
  };

  private interval: any;

  componentDidMount() {
    const stopper = this.props.text + "...";
    this.interval = setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: this.props.text }))
        : this.setState(() => ({ text: this.state.text + "." }));
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container">
        <p className="text-center">{this.state.text}</p>
      </div>
    );
  }
}
