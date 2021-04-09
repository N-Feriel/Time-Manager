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

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authed) {
          return isAuthenticated && isAuthenticated.isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to={location} />
          );
        }

        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={location} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
