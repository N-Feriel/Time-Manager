import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "./utils/GlobalStyles";
import {
  onDesktopMediaQuery,
  onSmallTabletMediaQuery,
} from "./utils/responsive";

import NavBar from "./components/navBar/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import AdminPage from "./pages/adminPage/AdminPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import GMotherPage from "./pages/gMotherPage/GMotherPage";
import GDaughterPage from "./pages/gDaughterPage/GDaughterPage";
import RegisterEventPage from "./pages/eventPage/component/RegisterEventPage";
import EventPage from "./pages/eventPage/EventPage";
import Stats from "./pages/adminPage/components/Stats";
import UserPage from "./pages/userPage/UserPage";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./components/footer/Footer";
import ArchivesGM from "./pages/userPage/component/ArchivesGM";
import AddTime from "./pages/userPage/component/AddTime";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <NavBar />

      <MainDesk>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>

          <ProtectedRoute
            exact
            path="/admin"
            authed={true}
            component={AdminPage}
          />

          <ProtectedRoute
            exact
            path="/register/gMother"
            authed={true}
            component={RegisterPage}
          />

          <ProtectedRoute
            exact
            path="/register/gDaughter"
            authed={true}
            isGDaughter={true}
            component={RegisterPage}
          />

          <ProtectedRoute
            exact
            path="/register/event"
            component={RegisterEventPage}
          />

          {/* <Route exact path="/register/event">
            <RegisterEventPage />
          </Route> */}

          <ProtectedRoute
            exact
            authed={true}
            path="/infoMother/:_id"
            component={GMotherPage}
          />

          <ProtectedRoute exact path="/stat" authed={true} component={Stats} />

          <ProtectedRoute exact path="/event/:_id" component={EventPage} />

          <ProtectedRoute
            exact
            path="/infoDaughter/:_id"
            component={GDaughterPage}
          />

          <ProtectedRoute exact path="/user/me" component={UserPage} />

          <ProtectedRoute
            exact
            path="/user/me/archives"
            component={ArchivesGM}
          />

          <ProtectedRoute exact path="/user/me/addTime" component={AddTime} />
        </Switch>
      </MainDesk>
      <Circle1></Circle1>
      <Circle2></Circle2>

      <Footer />
    </BrowserRouter>
  );
}

const MainDesk = styled.div`
  overflow-y: auto;
  max-height: fit-content;
  ${onSmallTabletMediaQuery()} {
    overflow-y: scroll;
    overflow-x: scroll;
    white-space: nowrap;
    font-size: 14px;
  }
  ${onDesktopMediaQuery()} {
    /* min-height: 80vh; */
    /* overflow-y: auto; */
    position: relative;
    background: white;
    width: 80%;
    /* max-height: fit-content; */
    justify-self: center;
    align-self: center;
    margin: 0 auto 4rem auto;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
    border-radius: 2rem;
    z-index: 3;
    backdrop-filter: blur(2rem);
    font-family: "Poppins", sans-serif;
    margin-top: 2rem;
  }
`;

const Circle1 = styled.div`
  ${onDesktopMediaQuery()} {
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
    );
    position: absolute;
    width: 10rem;
    height: 10rem;
    top: 8%;
    right: 5%;
    border-radius: 50%;
  }
`;

const Circle2 = styled.div`
  ${onDesktopMediaQuery()} {
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
    );
    position: absolute;
    bottom: 7px;
    left: 5%;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
`;

export default App;
