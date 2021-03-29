import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
  requestGMotherData,
  receiveGMotherData,
  receiveGMotherDataError,
} from "../../store/reducers/GMother/actions";

import {
  requestGDaughterData,
  receiveGDaughterData,
  receiveGDaughterDataError,
} from "../../store/reducers/GDaughter/actions";

import {
  requestEventData,
  receiveEventData,
  receiveEventError,
} from "../../store/reducers/Events/actions";

import GmotherList from "./components/GmotherList";
import GdaughterList from "./components/GdaughterList";
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";
import EventsList from "./components/EventsList";
import Stats from "./components/Stats";
import SideBar from "../../components/sideBar/SideBar";
import UserForm from "../../components/form /UserForm";

function AdminPage() {
  const dispatch = useDispatch();

  let history = useHistory();
  const { pathname, search } = useLocation();

  let [valueList, setValueList] = useState("default");

  const getGMothersData = () => {
    dispatch(requestGMotherData());

    fetch("/api/users/infoGMother")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveGMotherData(json.data));
      })
      .catch((error) => {
        console.log("error in request", error);
        dispatch(receiveGMotherDataError(error));
      });
  };

  const getGDaughtersData = () => {
    dispatch(requestGDaughterData());

    fetch("/api/users/infoGDaughter")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveGDaughterData(json.data));
      })
      .catch((error) => {
        console.log("error in request", error);
        dispatch(receiveGDaughterDataError(error));
      });
  };

  const getEventsData = () => {
    dispatch(requestEventData());

    fetch("/api/event")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveEventData(json.data));
      })
      .catch((error) => {
        console.log("error in request", error);
        dispatch(receiveEventError(error));
      });
  };

  const handleNewUser = (user) => {
    const location = {
      pathname: `/register/${user}`,
      state: {
        redirectTo: pathname,
      },
    };

    history.push(location);
  };

  useEffect(() => {
    getGMothersData();
    getGDaughtersData();
    getEventsData();
  }, []);

  return (
    <Wrapper>
      <SideBar handleNewUser={handleNewUser} setValueList={setValueList} />

      <UserForm />

      <div style={{ flex: 3 }}>
        {valueList === "default" && (
          <>
            <h2>Stats List</h2>
            <Stats setValueList={setValueList} />
          </>
        )}

        {valueList === "gMother" && (
          <>
            <h2>GMother List</h2>

            <GmotherList />
          </>
        )}

        {valueList === "gDaughter" && (
          <>
            <h2>GDaughter List</h2>

            <GdaughterList />
          </>
        )}

        {valueList === "register" && (
          <>
            <h2>Add / register</h2>

            <ul className="new">
              <li onClick={() => handleNewUser("gMother")}>New God Mother</li>
              <li onClick={() => handleNewUser("gDaughter")}>
                New God Daughter
              </li>
              <li onClick={() => handleNewUser("event")}>New Event</li>
            </ul>
          </>
        )}

        {valueList === "details" && (
          <>
            <h2>Events List</h2>

            <EventsList />
          </>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  color: rgba(40, 43, 71, 0.8);
  font-weight: 400;

  & h2 {
    margin-top: 4rem;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
  }

  & .new {
    background: linear-gradient(
      to right bottom,
      rgba(246, 196, 196, 0.2),
      rgba(246, 196, 196, 0.8)
    );

    padding: 2rem 5rem;
    justify-content: center;
    align-items: center;
    margin: 4rem;
    border-radius: 1rem;
  }

  & .new li {
    padding: 1rem;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.8)
    );
    margin: 20px auto;
    text-align: center;
    border-radius: 1.2rem;
    font-weight: 600;
  }

  & .new li:hover {
    background: linear-gradient(
      to right bottom,
      rgba(209, 58, 58, 0.1),
      rgba(209, 58, 58, 0.6)
    );
    color: white;
  }
`;

export default AdminPage;
