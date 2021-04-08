import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  requestStatData,
  receiveStatData,
  receiveStatDataError,
  receiveGMData,
  receiveGDData,
  receiveOneToData,
} from "../../../store/reducers/Stat/actions";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

function Stats({ setValueList }) {
  const {
    status,
    stats,
    StatGDaughters,
    StatMothers,
    statOneToOne,
  } = useSelector((state) => state.stat);

  const jwt = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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

  const getOneToOneStats = async () => {
    dispatch(requestStatData());

    try {
      const url = `/api/event/oneToOne/totalTime`;

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
        dispatch(receiveOneToData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
      console.log(error);
    }
  };

  const handleDetails = () => {
    setIsOpen(!isOpen);
    // console.log("onetoOne", statOneToOne);
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
    getOneToOneStats();
  }, []);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "error") {
    return <Error />;
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
                    {StatGM._id === true ? "Actives" : "Archives"} :
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
                    {StatGD._id === true ? "Actives" : "Archives"} :
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
            <h3>Total Time (mn)</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {stats.map((stat) => {
                return (
                  <li key={stat._id} style={{ padding: "10px" }}>
                    {stat._id === "OneToOne" ? (
                      <>
                        <div
                          onClick={handleDetails}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {stat._id} : <strong> {stat.total}</strong>
                        </div>
                        {isOpen && (
                          <div className="detailsOneToOne">
                            {statOneToOne && (
                              <>
                                {statOneToOne.map((statOne) => {
                                  return (
                                    <div
                                      key={statOne._id}
                                      style={{ margin: "10px 2px" }}
                                    >
                                      {statOne._id}:{" "}
                                      <strong>{statOne.total}</strong>
                                    </div>
                                  );
                                })}
                              </>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        {stat._id} : <strong> {stat.total}</strong>
                      </div>
                    )}
                  </li>
                );
              })}
            </div>

            <li className="first" onClick={() => setValueList("charts")}>
              ...Chart
            </li>

            <li className="last" onClick={() => setValueList("details")}>
              ...More
            </li>
          </ul>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  margin: auto 4rem 2rem 4rem;
  justify-content: space-around;
  background: linear-gradient(
    to left top,
    rgba(246, 196, 196, 0.12),
    rgba(97, 103, 160, 0.512)
  );
  flex-wrap: wrap;
  border-radius: 1.5rem;

  & ul {
    background: linear-gradient(
      to left top,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2)
    );
    margin: 2rem;
    padding: 2rem;
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

  & .detailsOneToOne {
    margin: 1rem 0.5rem;
    box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.5);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;

    background: rgba(246, 196, 196, 0.2);

    z-index: 4;
  }

  & li {
    margin: 1rem;
    box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.2)
    );
    width: max(40%, 150px);
  }

  & .first {
    align-self: flex-start;
    color: white;
  }
  & .last {
    align-self: flex-end;
    color: violet;
  }

  & .last,
  .first {
    /* align-self: flex-end; */
    position: absolute;
    bottom: 20px;
    background: none;
    /* color: white; */
    width: fit-content;
  }

  & .last:hover,
  .first:hover {
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
    margin: 1.5rem;

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
