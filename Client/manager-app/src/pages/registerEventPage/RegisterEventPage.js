import moment from "moment";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/button/Button";
import FormField from "../../components/form /FormField";
import SelectedField from "../../components/form /SelectedField";
import { UserContext } from "../../components/UserContext";
import { themeVars } from "../../utils/GlobalStyles";
import OneToOneEvent from "./component/OneToOneEvent";

function RegisterEventPage({ isOneToOneEvent, types }) {
  const { user } = useContext(UserContext);
  console.log(user);

  const initialState = {
    name: "",
    participants: {
      numberOfParticipants: 1,
      participantsName: [user._id],
    },
    time: Number,
    eventDate: "",
    type: "",
  };

  const history = useHistory();

  const [sources, setSources] = useState([
    { _id: "Meeting", name: "Meeting", text: "MEETING" },
    { _id: "Training", name: "Training", text: "TRAINING" },
    { _id: "OneToOne", name: "OneToOne", text: "One To One" },
    { _id: "Others", name: "Others", text: "OTHERS" },
  ]);

  const [errors, setErrors] = useState("");

  const [formData, setFormData] = useState(initialState);

  const url = "/api/event";

  const handleChange = (ev) => {
    const target = ev.target;

    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // console.log(formData)

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        history.push("/");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(errors);
    }
  };

  const handleChangeObj = (ev) => {
    const target = ev.target;

    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      participants: {
        ...formData.participants,
        [name]: value,
      },
    });
  };

  console.log(formData, "register event");

  return (
    <div>
      {isOneToOneEvent ? (
        <OneToOneEvent />
      ) : (
        <Container>
          <h2> Add new Event</h2>
          <form className="formC" onSubmit={handleSubmit}>
            <FormField
              name="name"
              label="Name"
              type="text"
              handleChange={handleChange}
              value={formData.name}
            />

            <SelectedField
              name="type"
              label="Type"
              type="text"
              handleChange={handleChange}
              value={formData.type}
              sources={types || sources}
            />

            <FormField
              name="eventDate"
              label="Date"
              type="date"
              handleChange={handleChange}
              value={formData.eventDate}
            />
            <FormField
              name="numberOfParticipants"
              label="Number Of Participants"
              type="number"
              handleChange={handleChangeObj}
              value={formData.participants.numberOfParticipants}
            />
            <FormField
              name="time"
              label="Time"
              type="text"
              handleChange={handleChange}
              value={formData.time}
            />

            <div style={{ alignSelf: "flex-end", margin: "1rem" }}>
              <Button type="submit">save</Button>
            </div>
          </form>
        </Container>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80%;
  margin: auto;

  & .formC {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  & button {
    background: ${themeVars.violet};
    color: white;
  }
`;

export default RegisterEventPage;
