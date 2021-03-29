import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../../components/button/Button";
import FormField from "../../../components/form /FormField";
import SelectedField from "../../../components/form /SelectedField";
import { UserContext } from "../../../components/UserContext";

function OneToOneEvent({ userGD, setIsTimeSubmited, timeSubmitedCallback }) {
  const { user } = useContext(UserContext);

  const initialState = {
    name: "GM Time OneToOne",
    participants: {
      numberOfParticipants: 1,
      participantsName: [userGD._id, user._id],
    },
    time: Number,
    eventDate: Date.now(),
    type: "OneToOne",
    typeOneToOne: "DEFAULT",
  };
  var moment = require("moment");
  const history = useHistory();
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

  const [sources, setSources] = useState([
    { _id: "DEFAULT", name: "DEFAULT", text: "DEFAULT" },
    { _id: "SMS", name: "SMS", text: "SMS" },
    { _id: "PHONE", name: "PHONE", text: "PHONE" },
    { _id: "EMAIL", name: "EMAIL", text: "EMAIL" },
    { _id: "Others", name: "Others", text: "OTHERS" },
  ]);
  console.log(formData);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // console.log(formData)

    console.log(ev, "ev");

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
        // setIsTimeSubmited(true);
        timeSubmitedCallback();
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(errors);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SelectedField
          name="typeOneToOne"
          label="Type"
          type="text"
          handleChange={handleChange}
          defaultValue={formData.typeOneToOne}
          sources={sources}
        />

        <FormField
          name="time"
          label="Time"
          type="text"
          handleChange={handleChange}
          value={formData.time}
        />

        <Button type="submit">Save</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  & form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  & button {
    padding: 10px;
    font-size: 14px;
    height: fit-content;
    margin: 2px;
  }
`;

export default OneToOneEvent;
