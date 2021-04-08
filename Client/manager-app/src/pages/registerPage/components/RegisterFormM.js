import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import * as Yup from "yup";
import Button from "../../../components/button/Button";
import FormikControl from "../../../components/formik/FormikControl";
import TextError from "../../../components/formik/TextError";
import { themeVars } from "../../../utils/GlobalStyles";
import { onLargeDesktopMediaQuery } from "../../../utils/responsive";
import _ from "lodash";
import ModalC from "../../../components/ModalC";

const sources = [
  { key: "Select Origin Type", value: "" },
  { key: "PPC", value: "PPC" },
  { key: "SITE", value: "SITE" },
  { key: "Facebook", value: "Facebook" },
  { key: "CLSC", value: "CLSC" },
  { key: "OTHERS", value: "OTHERS" },
];

const languages = [
  { _id: "EN", key: "English", value: "english" },
  { _id: "FR", key: "French", value: "french" },
  { _id: "AR", key: "Arabic", value: "arabic" },
  { _id: "ES", key: "Espanol", value: "espanol" },
];

const training = [
  { _id: "J1", value: "DAY_1", key: "DAY 1" },
  { _id: "J2", value: "DAY_2", key: "DAY 2" },
  { _id: "J3", value: "DAY_3", key: "DAY 3" },
];

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  password: "123456",
  phone: Number,
  address: {
    city: "",
    zipCode: "",
    street: "",
    state: "",
  },
  isMember: false,
  isAdmin: false,
  languages: [],
  origin: "",
  startDate: null,
  training: [],
  isActif: false,
};

const phoneRegExp = /\d{3}-\d{3}-\d{4}/;

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Must be Valid Email").required("Required"),
  origin: Yup.string().required("Required"),
  languages: Yup.array().required("Must Select at least one"),
  startDate: Yup.date().required("Required").nullable(),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number format 123-456-7890")
    .required("Required"),
});

function RegisterFormM() {
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const url = "/api/register/gMother/";

  const jwt = localStorage.getItem("token");

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  function closeModal() {
    setIsOpen(false);

    history.push("/admin");
  }

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
        // history.push('/admin')
        //send email to the user to change his password and validate his email
        let mailData = _.pick(values, ["first_name", "last_name", "email"]);
        let response2 = await fetch("/api/send", {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`,
          },
        });
        let responseBody2 = await response2.json();

        if (responseBody2.status === 201) {
          setMessageAl(responseBody2.message);
          setIsOpen(true);
          console.log("send");
        } else {
          throw responseBody2.message;
          //redirect user to resend email!!!
        }

        // history.push(state.redirectTo);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <Container>
      <h2>Add new GMother</h2>
      <div style={{ margin: "1rem auto 1rem 2rem" }}>
        {errors && <TextError>{errors}</TextError>}
      </div>

      <ModalC
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      >
        <div>
          <h2>{messageAl}</h2>
          <Button onClick={closeModal}>close</Button>
        </div>
      </ModalC>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <div className="cont">
                <FormikControl
                  control="input"
                  type="text"
                  label="Fisrt Name"
                  name="first_name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Last Name"
                  name="last_name"
                />
              </div>
              <div className="cont">
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Phone"
                  name="phone"
                />
              </div>

              <div>
                <div className="cont">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Street"
                    name="address.street"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="City"
                    name="address.city"
                  />
                </div>

                <div className="cont">
                  <FormikControl
                    control="input"
                    type="text"
                    label="State/Province"
                    name="address.state"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="zipCode"
                    name="address.zipCode"
                  />
                </div>
              </div>
              <div className="cont info">
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Member of PPC"
                  name="isMember"
                  isCheckBox
                />
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Admin"
                  name="isAdmin"
                  isCheckBox
                />

                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Actif"
                  name="isActif"
                  isCheckBox
                />
              </div>

              <div className="cont">
                <FormikControl
                  control="date"
                  label="Start Date"
                  name="startDate"
                />

                <FormikControl
                  control="select"
                  label="Source"
                  name="origin"
                  options={sources}
                />
              </div>

              <FormikControl
                control="checkbox"
                label="Languages"
                name="languages"
                options={languages}
                isCheckBox
              />

              <FormikControl
                control="checkbox"
                label="Training"
                name="training"
                options={training}
                isCheckBox
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: " 2rem 0 5rem 0",
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
  );
}

const Container = styled.div`
  ${onLargeDesktopMediaQuery()} {
    form {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: space-evenly;

      & .cont {
        display: flex;
        align-items: center;
        margin: auto;
      }

      & .info {
        margin: 2rem 0;
      }
    }
  }
`;

export default RegisterFormM;
