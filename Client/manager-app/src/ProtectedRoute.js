import React, { useState } from "react";

import { Redirect, useLocation } from "react-router";
import { getCurrentUser } from "./services/authService";

const ProtectedRoute = (props, ...rest) => {
  const Component = props.component;
  const isAuthenticated = getCurrentUser(); // your auth from the store / db

  //   console.log(props.authed, "protected route");

  const { pathname, search } = useLocation();

  const location = {
    pathname: "/login",
    state: {
      redirectTo: pathname,
    },
  };

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
};

export default ProtectedRoute;
