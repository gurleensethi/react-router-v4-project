import React, { FunctionComponent } from "react";
import { Route, Link, withRouter, RouteComponentProps } from "react-router-dom";
import slug from "slug";

interface Props {
  title: string;
  list: string[];
  loading: boolean;
}

const CustomLink: FunctionComponent<{
  to: { pathname: string; search: string };
}> = ({ to, children }) => {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => {
        return (
          <li
            style={{
              listStyleType: "none",
              fontWeight: match ? "bold" : "normal",
            }}
          >
            <Link to={to}>{children}</Link>
          </li>
        );
      }}
    />
  );
};

export const Sidebar = withRouter(
  class extends React.Component<RouteComponentProps & Props> {
    render() {
      const { title, list, loading, location, match } = this.props;
      return loading === true ? (
        <h1>LOADING</h1>
      ) : (
        <div>
          <h3 className="header">{title}</h3>
          <ul className="sidebar-list">
            {list.map((item) => (
              <CustomLink
                key={item}
                to={{
                  pathname: `${match.url}/${slug(item)}`,
                  search: location.search,
                }}
              >
                {item.toUpperCase()}
              </CustomLink>
            ))}
          </ul>
        </div>
      );
    }
  }
);
