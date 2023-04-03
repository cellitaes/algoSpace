import { FC, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../shared/context/AuthContext";

import { RouteProps } from "../types/route";

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { token } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
