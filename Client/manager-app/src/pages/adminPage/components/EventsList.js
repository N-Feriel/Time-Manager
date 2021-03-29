import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Button from "../../../components/button/Button";
import { themeVars } from "../../../utils/GlobalStyles";

import {
  requestEventData,
  receiveEventData,
  receiveEventError,
} from "../../../store/reducers/Events/actions";

function EventsList() {
  const { status, events } = useSelector((state) => state.event);

  const { stats } = useSelector((state) => state.stat);

  var moment = require("moment");

  const dispatch = useDispatch();

  const jwt = localStorage.getItem("token");

  const [currentType, setCurrentType] = useState("OneToOne");

  const [pageNumber, setPageNumber] = useState(0);

  const eventsPerPage = 6;
  const pagesVisited = pageNumber * eventsPerPage;

  const history = useHistory();

  const handleEventDetails = (_id) => {
    history.push(`/event/${_id}`);
  };

  const getFilteredEvent = async (type) => {
    dispatch(requestEventData());
    try {
      const url = `/api/event/events/${type}`;

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
        dispatch(receiveEventData(responseBody.data[0].events));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
      dispatch(receiveEventError(error));
    }
  };

  useEffect(() => {
    getFilteredEvent(currentType);
  }, [currentType]);

  if (status === "loading") {
    return <div>...Loading</div>;
  }
  if (status === "error") {
    return <div>...error</div>;
  }
  if (status === "idle") {
    const displayEvents = events
      .slice(pagesVisited, pagesVisited + eventsPerPage)
      .map((event, i) => {
        return (
          <div className="details" key={i}>
            <div>
              <div>{event.name}</div>

              <div>{event.type}</div>
            </div>
            <div>{moment(event.eventDate).format("MMM Do YY, h:mm a")}</div>

            {/* <span>{event.participants.numberOfParticipants}</span> */}

            <div>
              <Button onClick={() => handleEventDetails(event._id)}>
                Details
              </Button>
            </div>
          </div>
        );
      });
    const pageCount = Math.ceil(events.length / eventsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    return (
      <Wrapper>
        <div className="categories">
          {stats.map((category) => (
            <div
              className={`category ${
                currentType === category._id ? "active" : ""
              }`}
              key={category._id}
              onClick={() => setCurrentType(category._id)}
            >
              {category._id}
            </div>
          ))}
        </div>

        <Container>
          {displayEvents}

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          )}
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to right bottom,
    rgba(216, 231, 253, 0.8),
    rgba(4, 43, 81, 0.2)
  );
  padding: 2rem;
  margin: 2rem;
  width: 90%;
  border-radius: 1rem;

  /* & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */

  & .details {
    width: 90%;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.1)
    );
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.8rem;
  }

  & .categories {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  & .category {
    background: linear-gradient(
      to right bottom,
      rgba(172, 135, 135, 0.5),
      rgba(97, 103, 160, 0.5)
    );
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  & .category:hover {
    background: linear-gradient(
      to right bottom,
      rgba(172, 135, 135, 0.9),
      rgba(209, 58, 58, 0.5)
    );
  }
  & .active {
    background: linear-gradient(
      to right bottom,
      rgba(172, 135, 135, 0.9),
      rgba(209, 58, 58, 0.5)
    );
  }

  & span {
    padding: 1rem;
  }
  & button {
    margin: 1rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.6);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .paginationBttns {
    width: 80%;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  & .paginationBttns a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid ${themeVars.pink};
    color: ${themeVars.pink};
    cursor: pointer;
  }

  & .paginationBttns a:hover {
    color: white;
    background-color: ${themeVars.darkPink};
  }

  & .paginationActive a {
    color: white;
    background-color: ${themeVars.darkPink};
  }

  & .paginationDisabled a {
    color: ${themeVars.grey};
    background-color: ${themeVars.grey};
  }
`;

export default EventsList;
