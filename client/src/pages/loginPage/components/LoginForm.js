import React from "react";
import Button from "../../../components/button/Button";

import { getCurrentUser, login } from "../../../services/authService";

import { useSelector, useDispatch } from "react-redux";
import {
  requestUserData,
  receiveUserDataError,
} from "../../../store/reducers/user/actions";
import { Redirect, useHistory, useLocation } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/formik/FormikControl";
import TextError from "../../../components/formik/TextError";
import styled from "styled-components";
import { themeVars } from "../../../utils/GlobalStyles";

function LoginForm() {
  const initialValues = { email: "", password: "" };

  const { error } = useSelector((state) => state.user);

  console.log("error", error);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email Format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const { state } = useLocation();

  const onSubmit = async (values) => {
    // ev.preventDefault();

    dispatch(requestUserData("loading"));

    try {
      const response = await login(values);

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        localStorage.setItem("token", responseBody.data);
        history.push(state.redirectTo);
      } else {
        throw responseBody;
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        console.log(error);
        dispatch(receiveUserDataError(error));
      }
    }
  };

  if (getCurrentUser()) return <Redirect to="/" />;

  return (
    <Wrapper>
      {error && <TextError>{error.error}</TextError>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />

              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
              />
              <Button type="submit" disabled={!formik.isValid}>
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(
    to left top,
    rgba(10, 145, 149, 0.7),
    rgba(255, 255, 255, 0.9)
  );
  border-radius: 1rem;

  margin: 2rem auto;
  & button {
    margin-left: auto;
    margin-top: 2rem;
    background: ${themeVars.darkBlue};
    color: ${themeVars.lavender};
  }

  padding: 2rem;
`;

export default LoginForm;
