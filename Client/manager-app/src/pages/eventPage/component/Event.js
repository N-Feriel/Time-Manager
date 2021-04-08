import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "../../../components/formik/FormikControl";
import Button from "../../../components/button/Button";
import TextError from "../../../components/formik/TextError";

import { UserContext } from "../../../components/UserContext";
import styled from "styled-components";
import { themeVars } from "../../../utils/GlobalStyles";

function Event({ updateValue }) {
  const url = "/api/event";
  const [errors, setErrors] = useState("");
  const history = useHistory();

  const { user } = useContext(UserContext);

  const eventTypes = [
    { key: "Select event Type", value: "" },
    { value: "Meeting", key: "meeting" },
    { value: "Training", key: "training" },
    { value: "OneToOne", key: "oneToOne" },
    { value: "Volunteer", key: "volunteer" },
    { value: "FaceBook", key: "faceBook" },
    { value: "Others", key: "others" },
  ];

  const initialValues = {
    name: "",
    participants: {
      numberOfParticipants: 1,
      participantsName: [user._id],
    },
    time: Number,
    eventDate: null,
    type: "",
    typeOneToOne: "DEFAULT",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    time: Yup.number().required("Required").positive("Must be Positive Number"),
    participants: Yup.object({
      numberOfParticipants: Yup.number()
        .required("Required")
        .positive("Must be Positive Number"),
      participantsName: Yup.array().required("Required"),
    }),
    eventDate: Yup.date().required("Required").nullable(),
    type: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        history.push("/user/me");
      } else {
        // console.log("resonpse", responseBody);
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
      console.log(errors, "erros");
    }
  };

  return (
    <Container>
      {errors && <TextError>{errors}</TextError>}
      <h2> Add new Event</h2>
      <Formik
        initialValues={updateValue || initialValues}
        validationSchema={validationSchema}
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
                control="select"
                label="Communication Type"
                name="type"
                options={eventTypes}
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

              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
  );
}

const Container = styled.div`
  height: 80vh;

  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  align-items: center;
`;
export default Event;
