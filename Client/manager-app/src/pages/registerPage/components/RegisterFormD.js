import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

import styled from "styled-components";
import * as Yup from "yup";
import Button from "../../../components/button/Button";
import FormikControl from "../../../components/formik/FormikControl";
import TextError from "../../../components/formik/TextError";
import { themeVars } from "../../../utils/GlobalStyles";

import _ from "lodash";
import { useSelector } from "react-redux";
import { onLargeDesktopMediaQuery } from "../../../utils/responsive";

const sources = [
  { key: "Select Origin Type", value: "" },
  { key: "PPC", value: "PPC" },
  { key: "SITE", value: "SITE" },
  { key: "Facebook", value: "Facebook" },
  { key: "CLSC", value: "CLSC" },
  { key: "LOT", value: "LOT" },
  { key: "OTHERS", value: "OTHERS" },
];

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  phone: Number,
  address: {
    city: "",
    zipCode: "",
    street: "",
    state: "",
  },
  isMember: false,
  origin: "",
  dueDate: null,
  infoParent: {
    isContact: false,
    name: "",
  },
  assignTo: {
    isAssign: false,
    assignGM: "",
  },
  isActif: false,
};

const phoneRegExp = /\d{3}-\d{3}-\d{4}/;

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Must be Valid Email").required("Required"),
  origin: Yup.string().required("Required"),
  //   dueDate: Yup.date().required("Required").nullable(),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number format 123-456-7890")
    .required("Required"),

  assignTo: Yup.object({
    assignGM: Yup.string().required("Required"),
  }),
});

function RegisterFormD() {
  const url = "/api/register/gDaughter/";
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [sendFail, setSendFail] = useState(false);

  const jwt = localStorage.getItem("token");
  const { state } = useLocation();

  let assignData,
    listGM = [];

  const { status, gMothers } = useSelector((state) => state.gMother);

  if (status === "idle") {
    assignData = gMothers.map((gMother) =>
      _.pick(gMother, ["_id", "first_name", "last_name"])
    );

    listGM = assignData.map((GM) => ({
      key: `${GM.first_name} ${GM.last_name}`,
      value: `${GM._id}`,
    }));
  }

  const sendMessage = async (values) => {
    let mailGM = _.pick(values, [
      "first_name",
      "last_name",
      "email",
      "assignTo",
    ]);

    // console.log(mailGM, "mailG");

    try {
      let responseGM = await fetch("/api/send/assignto", {
        method: "POST",
        body: JSON.stringify(mailGM),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      let responseBodyGM = await responseGM.json();

      if (responseBodyGM.status === 201) {
        setSendFail(false);
        alert(responseBodyGM.message);
      } else {
        setSendFail(true);
        throw responseBodyGM.message;
        //redirect user to resend email!!!
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const createNotification = async (values) => {
    let notificationData = {
      name: "New GDaughter is Assign to you",
      isSeen: false,
      sendBy: "",
      eventDate: Date.now(),
      userId: values.assignTo.assignGM,
      clientId: values.email,
    };

    try {
      let responseNot = await fetch("/api/notification", {
        method: "POST",
        body: JSON.stringify(notificationData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      let responseBodyNotify = await responseNot.json();

      if (responseBodyNotify.status === 201) {
        console.log(responseBodyNotify, "dataNotification");
        alert("Notification was send to GMother");
      } else {
        throw responseBodyNotify.message;
        //redirect user to resend email!!!
      }
    } catch (error) {
      setErrors(error);
    }
  };

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
        //send email to GMother that assig to
        sendMessage(values);
        createNotification(values);
        history.push(state.redirectTo);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <Container>
      <h2>Add new GDaughter</h2>
      <div style={{ margin: "1rem auto 1rem 2rem" }}>
        {errors && <TextError>{errors}</TextError>}
      </div>

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
                  label="Actif"
                  name="isActif"
                  isCheckBox
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  margin: "0 1rem 1rem 0",
                }}
              >
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Contact Parent"
                  name="infoParent.isContact"
                  isCheckBox
                />

                <FormikControl
                  control="input"
                  type="text"
                  label="Name parent"
                  name="infoParent.name"
                />
              </div>

              <div className="cont">
                <FormikControl
                  control="date"
                  label="Due Date/ Date of Birth"
                  name="dueDate"
                />

                <FormikControl
                  control="select"
                  label="Source"
                  name="origin"
                  options={sources}
                />
              </div>

              <FormikControl
                control="select"
                label="AssignGM"
                name="assignTo.assignGM"
                options={listGM}
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

export default RegisterFormD;
