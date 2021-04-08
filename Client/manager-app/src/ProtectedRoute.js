import React from "react";

import { useLocation } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { getCurrentUser } from "./services/authService";

const ProtectedRoute = ({ ...props }) => {
  const Component = props.component;
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
      {...props}
      render={(props) => {
        if (props.authed) {
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
