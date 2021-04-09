import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from "react-redux";
import configureStore from "./store/index";
import { UserProvider } from "./components/UserContext";

const store = configureStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>,
  rootElement
);
