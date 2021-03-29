import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "./utils/GlobalStyles";
import {
  device,
  onLargeDesktopMediaQuery,
  onSmallTabletMediaQuery,
} from "./utils/responsive";
import { useMediaQuery } from "react-responsive";

import { getCurrentUser } from "./services/authService";

import NavBar from "./components/navBar/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import AdminPage from "./pages/adminPage/AdminPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import GMotherPage from "./pages/gMotherPage/GMotherPage";
import GDaughterPage from "./pages/gDaughterPage/GDaughterPage";
import RegisterEventPage from "./pages/registerEventPage/RegisterEventPage";
import EventPage from "./pages/eventPage/EventPage";
import Stats from "./pages/adminPage/components/Stats";
import UserPage from "./pages/userPage/UserPage";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./components/footer/Footer";
import ArchivesGM from "./pages/userPage/component/ArchivesGM";
import AddTime from "./pages/userPage/component/AddTime";

function App() {
  const initialDataM = {
    email: "",
    first_name: "",
    last_name: "",
    password: "123456",
    phone: Number,
    address: {
      city: "",
      zipCode: "",
      street: "",
      state: "",
    },
    isMember: Boolean,
    languages: [],
    origin: "",
    startDate: "",
    training: [],
    isActif: Boolean,
  };

  const initialDataD = {
    email: "",
    first_name: "",
    last_name: "",
    phone: Number,
    address: {
      city: "",
      zipCode: "",
      street: "",
      state: "",
    },
    isMember: Boolean,
    origin: "",
    dueDate: "",
    infoParent: {
      isContact: Boolean,
      name: "",
    },
    assignTo: {
      isAssign: Boolean,
      assignGM: "",
    },
    isActif: Boolean,
  };

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

          <Route exact path="/register/gMother">
            <RegisterPage initialState={initialDataM} />
          </Route>

          <Route exact path="/register/gDaughter">
            <RegisterPage initialState={initialDataD} isGDaughter />
          </Route>

          <Route exact path="/register/event">
            <RegisterEventPage />
          </Route>

          <Route exact path="/infoMother/:_id">
            <GMotherPage />
          </Route>
          <Route exact path="/infoDaughter/:_id">
            <GDaughterPage />
          </Route>
          <Route exact path="/event/:_id">
            <EventPage />
          </Route>

          <Route exact path="/stat">
            <Stats />
          </Route>

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
  ${onSmallTabletMediaQuery()} {
    overflow-y: auto;
  }
  ${onLargeDesktopMediaQuery()} {
    min-height: 80vh;
    background: white;
    width: 70%;
    max-height: fit-content;
    justify-self: center;
    align-self: center;
    margin: auto;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
    border-radius: 2rem;
    z-index: 3;
    backdrop-filter: blur(2rem);
    font-family: "Poppins", sans-serif;
    /* margin-top: 48px; */
  }
`;

const Circle1 = styled.div`
  ${onLargeDesktopMediaQuery()} {
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
    );
    position: absolute;
    width: 10rem;
    height: 10rem;
    top: 10%;
    right: 10%;
    border-radius: 50%;
  }
`;

const Circle2 = styled.div`
  ${onLargeDesktopMediaQuery()} {
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
    );
    position: absolute;
    bottom: 5%;
    left: 7%;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
`;

export default App;
