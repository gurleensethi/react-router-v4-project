import React, { Component } from "react";

export const dynamicImport = (
  load: () => Promise<any>
): React.ComponentType => {
  return class extends Component<{
    Component?: React.FunctionComponent | null;
  }> {
    state: { Component?: React.FunctionComponent | null } = {};

    componentDidMount() {
      load().then((Component) => {
        console.log(Component);
        this.setState(() => ({ Component: Component.default }));
      });
    }

    render() {
      const { Component } = this.state;
      const { ...rest } = this.props;
      if (!Component) {
        return null;
      }
      return <Component {...rest} />;
    }
  };
};
