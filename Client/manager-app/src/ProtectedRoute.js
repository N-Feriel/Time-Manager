import React from "react";

import { useLocation } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { getCurrentUser } from "./services/authService";

const ProtectedRoute = ({
  path,
  component: Component,
  authed,
  render,
  ...rest
}) => {
  const isAuthenticated = getCurrentUser(); // your auth from the store / db

  const { pathname } = useLocation();

  const location = {
    pathname: "/login",
    state: {
      redirectTo: pathname,
    },
  };

  console.log(authed);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authed) {
          if (isAuthenticated && isAuthenticated.isAdmin)
            return Component ? <Component {...props} /> : render(props);
          return <Redirect to={"/"} />;
        } else {
          if (!isAuthenticated) return <Redirect to={location} />;
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
