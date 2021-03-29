import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import Button from "../../components/button/Button";

function EventPage() {
  const { _id } = useParams();
  const [statusEvent, setStatusEvent] = useState("loading");
  const [eventDetails, setEventsData] = useState([]);
  const [errors, setErrors] = useState("");

  const history = useHistory();

  var moment = require("moment");

  const getEventDetails = async () => {
    try {
      const responseHeader = await fetch(`/api/event/${_id}`);

      const response = await responseHeader.json();

      if (response.status === 200) {
        setEventsData(response.data);
        setStatusEvent("idle");
      } else {
        throw response.message;
      }
    } catch (error) {
      console.log(error);
      setErrors(error);
      setStatusEvent("error");
    }
  };

  const handleUpdate = async (_id) => {
    try {
      const responseHeader = await fetch(`/api/event/${_id}`, {
        method: "PATCH",
        body: JSON.stringify(eventDetails),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const response = await responseHeader.json();

      if (response.status === 201) {
        setEventsData(response.data);
        setStatusEvent("idle");
      } else {
        throw response.message;
      }
    } catch (error) {
      console.log(error);
      setErrors(error);
      setStatusEvent("error");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const responseHeader = await fetch(`/api/event/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const response = await responseHeader.json();

      if (response.status === 200) {
        history.push("/admin");
      } else {
        throw response.message;
      }
    } catch (error) {
      setStatusEvent("error");
      setErrors(error);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  if (statusEvent === "loading") {
    return <div>Loading...</div>;
  } else if (statusEvent === "error") {
    return (
      <div>
        Error...
        <br></br>
        {errors}
      </div>
    );
  } else if (statusEvent === "idle") {
    return (
      <Main>
        <Wrapper>
          <h4> Event details</h4>

          <div>
            <strong>name: </strong>
            {eventDetails.name}
          </div>
          <div>
            <strong>time: </strong>
            {eventDetails.time} min
          </div>

          <div>
            <strong>Date: </strong>
            {moment(eventDetails.eventDate).format("MMM Do YY, h:mm a")}
          </div>
          <div className="buttonC">
            <Button onClick={() => handleUpdate(eventDetails._id)}>
              Update
            </Button>
            <Button onClick={() => handleDelete(eventDetails._id)}>
              Delete
            </Button>
          </div>
        </Wrapper>
      </Main>
    );
  }
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 2rem;
  margin: 5rem auto;
  border-radius: 1rem;

  & button:hover {
    background: rgba(236, 69, 144, 0.5);
    color: white;
  }

  & div {
    padding: 1rem;
  }

  & .buttonC {
    display: flex;
    justify-content: space-around;
  }
`;

const Wrapper = styled.div`
  background: linear-gradient(
    to left top,
    rgba(69, 228, 236, 0.7),
    rgba(114, 140, 121, 0.5)
  );
`;

export default EventPage;
