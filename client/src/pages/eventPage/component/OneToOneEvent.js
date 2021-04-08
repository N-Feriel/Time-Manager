import React, { useContext, useState } from "react";
import { UserContext } from "../../../components/UserContext";

import styled from "styled-components";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "../../../components/formik/FormikControl";
import Button from "../../../components/button/Button";
import TextError from "../../../components/formik/TextError";

function OneToOneEvent({ userGD, timeSubmitedCallback }) {
  const { user } = useContext(UserContext);

  const initialValues = {
    name: "GM Time OneToOne",
    participants: {
      numberOfParticipants: 1,
      participantsName: [userGD._id, user._id],
    },
    time: Number,
    eventDate: new Date().toISOString(),
    type: "OneToOne",
    typeOneToOne: "DEFAULT",
  };

  const [errors, setErrors] = useState("");

  const validationSchema = Yup.object({
    time: Yup.number().required("Required").positive("Must be Positive Number"),
  });

  const jwt = localStorage.getItem("token");
  const url = "/api/event";

  const communicationTypes = [
    { value: "DEFAULT", key: "DEFAULT" },
    { value: "SMS", key: "SMS" },
    { value: "PHONE", key: "PHONE" },
    { value: "EMAIL", key: "EMAIL" },
    { value: "Others", key: "OTHERS" },
  ];

  const onSubmit = async (values) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        timeSubmitedCallback();
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <Container>
      {errors && <TextError>{errors}</TextError>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="select"
                label="Communication Type"
                name="typeOneToOne"
                options={communicationTypes}
              />
              <FormikControl
                control="input"
                type="text"
                label="Time"
                name="time"
              />

              <Button type="submit" disabled={!formik.isValid}>
                Save
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

const Container = styled.div`
  & form {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  & button {
    justify-self: flex-end;
    font-size: 14px;
    height: fit-content;
  }
`;

export default OneToOneEvent;
