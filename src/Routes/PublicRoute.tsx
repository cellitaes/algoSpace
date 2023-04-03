import { FC } from "react";
import { Route } from "react-router-dom";

import { RouteProps } from "../types/route";

const PublicRoute: FC<RouteProps> = ({ children, ...rest }) => {
  return <Route {...rest} render={() => children} />;
};

export default PublicRoute;
