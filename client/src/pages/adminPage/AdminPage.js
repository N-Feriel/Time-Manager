import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import EventsList from "./components/EventsList";
import Stats from "./components/Stats";
import SideBar from "../../components/sideBar/SideBar";
import ChartRepresentation from "./components/ChartRepresentation";

function AdminPage() {
  const dispatch = useDispatch();

  let history = useHistory();
  const { pathname } = useLocation();

  const jwt = localStorage.getItem("token");
  let [valueList, setValueList] = useState("default");
  const { REACT_APP_API_URL } = process.env;

  const url = `${REACT_APP_API_URL}/api`;

  console.log(url);

  const getGMothersData = async () => {
    dispatch(requestGMotherData());

    try {
      const response = await fetch(`${url}/users/infoGMother`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveGMotherData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveGMotherDataError(error));
    }
  };

  const getGDaughtersData = async () => {
    dispatch(requestGDaughterData());

    try {
      const response = await fetch(`${url}/users/infoGDaughter`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveGDaughterData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveGDaughterDataError(error));
    }
  };

  const getEventsData = async () => {
    dispatch(requestEventData());

    fetch(`${url}/event`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveEventData(json.data));
      })
      .catch((error) => {
        console.log("error in request", error);
        dispatch(receiveEventError(error));
      });

    // try {
    //   const response = await fetch('/api/event', {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "x-auth-token": `${jwt}`,
    //     },
    //   });

    //   const responseBody = await response.json();

    //   if (responseBody.status === 200) {
    //     dispatch(receiveEventData(responseBody.data));
    //   } else {
    //     throw responseBody.message;
    //   }
    // } catch (error) {
    //   dispatch(receiveEventError(error));
    // }
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
      <SideBar
        handleNewUser={handleNewUser}
        setValueList={setValueList}
        valueList={valueList}
      />

      <div style={{ flex: 3, overflowX: "scroll" }}>
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

        {valueList === "charts" && (
          <>
            <h2>Chart Representation</h2>

            <ChartRepresentation />
          </>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  height: 80vh;
  color: rgba(40, 43, 71, 0.8);
  font-weight: 400;
  overflow-x: hidden;

  & h2 {
    margin-top: 3rem;
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
