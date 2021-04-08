import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Error from "../../components/Error";
import FormikControl from "../../components/formik/FormikControl";
import Loading from "../../components/Loading";
import { themeVars } from "../../utils/GlobalStyles";
import Event from "./component/Event";

function EventPage() {
  const { _id } = useParams();
  const [statusEvent, setStatusEvent] = useState("loading");
  const [eventDetails, setEventsData] = useState([]);
  const [errors, setErrors] = useState("");
  const [isUpdate, setUpdate] = useState(false);

  const history = useHistory();

  var moment = require("moment");
  const jwt = localStorage.getItem("token");

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

  const onSubmit = async (values) => {
    try {
      const responseHeader = await fetch(`/api/event/${_id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const response = await responseHeader.json();

      if (response.status === 201) {
        setEventsData(response.data);
        setStatusEvent("idle");
        setUpdate(false);
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
    return <Loading />;
  } else if (statusEvent === "error") {
    return (
      <div>
        <Error />
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
            <strong>time: </strong>
            {eventDetails.type}
          </div>
          <div>
            <strong>Date: </strong>
            {moment(eventDetails.eventDate).format("MMM Do YY, h:mm a")}
          </div>

          {isUpdate ? (
            <Container>
              <Formik
                initialValues={eventDetails}
                enableReinitialize
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Name"
                        name="name"
                      />

                      <FormikControl
                        control="date"
                        label="Event Date"
                        name="eventDate"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Number Of Participants"
                        name="participants.numberOfParticipants"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Time"
                        name="time"
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button type="submit" disabled={!formik.isValid}>
                          Save
                        </Button>
                        <Button
                          style={{
                            background: `${themeVars.violet}`,
                            color: `${themeVars.pink}`,
                          }}
                          type="reset"
                        >
                          Reset
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Container>
          ) : (
            <div className="buttonC">
              <Button onClick={() => setUpdate(!isUpdate)}>Update</Button>
              <Button onClick={() => handleDelete(eventDetails._id)}>
                Delete
              </Button>
            </div>
          )}
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

const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
`;

export default EventPage;
