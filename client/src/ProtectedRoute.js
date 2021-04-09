import React from "react";

import { useLocation } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { getCurrentUser } from "./services/authService";

const ProtectedRoute = ({
  path,
  component: Component,
  authed,
  render,
  props,
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
          console.log(rest);
          return isAuthenticated && isAuthenticated.isAdmin ? (
            Component ? (
              <Component {...props} {...rest} />
            ) : (
              render(props)
            )
          ) : (
            <Redirect to={location} />
          );
        }

        return isAuthenticated ? (
          Component ? (
            <Component {...props} {...rest} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect to={location} />
        );
      }}

      // render=(props=>{
      //   if(authed){
      //     if(isAuthenticated && isAuthenticated.isAdmin){
      //       return Component ? <Component {...}
      //     }
      //   }
      // })
    />
  );
};

export default ProtectedRoute;
