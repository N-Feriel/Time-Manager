import { concat, keys } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import themeVars from "../../../utils/GlobalStyles";

import { receiveEventData } from "../../../store/reducers/Events/actions";
import {
  requestStatData,
  receiveStatData,
  receiveStatDataError,
  receiveGMData,
  receiveGDData,
} from "../../../store/reducers/Stat/actions";

function Stats({ setValueList }) {
  const { status, stats, StatGDaughters, StatMothers } = useSelector(
    (state) => state.stat
  );

  const jwt = localStorage.getItem("token");
  const dispatch = useDispatch();

  const getStats = async () => {
    dispatch(requestStatData());

    try {
      const url = `/api/event/stat/totalTime/`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        dispatch(receiveStatData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
      console.log(error);
    }
  };

  const getGMStats = async () => {
    dispatch(requestStatData());

    try {
      const url = `/api/users/stat/gMother`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        dispatch(receiveGMData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
      console.log(error);
    }
  };

  const getGDStats = async () => {
    dispatch(requestStatData());

    try {
      const url = `/api/users/stat/gDaughter`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        dispatch(receiveGDData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
    getGMStats();
    getGDStats();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "error") {
    return <div>Error...</div>;
  } else if (status === "idle") {
    return (
      <Container>
        <div>
          {StatMothers ? (
            <div className="subContainer">
              <h3>GMothers</h3>
              {StatMothers.map((StatGM, i) => {
                return (
                  <div className="rStat" key={i}>
                    {StatGM._id === true ? "Actifs" : "Archives"} :
                    <strong> {StatGM.count}</strong>
                  </div>
                );
              })}
            </div>
          ) : (
            <div> No GMothers in the list</div>
          )}

          {StatGDaughters ? (
            <div className="subContainer">
              <h3>Clients</h3>
              {StatGDaughters.map((StatGD, i) => {
                return (
                  <div className="rStat" key={i}>
                    {StatGD._id === true ? "Actifs" : "Archives"} :
                    <strong> {StatGD.count}</strong>
                  </div>
                );
              })}
            </div>
          ) : (
            <div> No Client in the list</div>
          )}
        </div>

        {stats && (
          <ul>
            <h3>Total Time</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {stats.map((stat) => {
                return (
                  <li key={stat._id} style={{ padding: "10px" }}>
                    {stat._id} : <strong> {stat.total}</strong>
                  </li>
                );
              })}
            </div>

            <li className="last" onClick={() => setValueList("details")}>
              ...more
            </li>
          </ul>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  margin: 4rem;
  justify-content: space-around;
  background: linear-gradient(
    to left top,
    rgba(246, 196, 196, 0.12),
    rgba(97, 103, 160, 0.512)
  );
  border-radius: 1.5rem;

  & ul {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2)
    );
    margin: 2rem;
    padding: 1rem;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 2;
  }

  & h3 {
    color: rgba(40, 43, 71, 0.8);
    font-weight: 600;
    font-size: 1.2rem;
    text-align: center;
  }

  & li {
    margin: 1rem;
    box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.2)
    );
    width: 40%;
  }

  & .last {
    align-self: flex-end;
    position: absolute;
    bottom: 20px;
    background: none;
    color: white;
    width: fit-content;
  }

  & .last:hover {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.1)
    );
    color: black;
    padding: 0.5rem;
    cursor: pointer;
  }

  & .subContainer {
    background: linear-gradient(
      to left top,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2)
    );
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    margin: 2rem;

    & .rStat {
      box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
      background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.9)
      );
      padding: 0.5rem;
      text-align: center;
      margin-top: 0.8rem;
    }
  }
`;

export default Stats;
