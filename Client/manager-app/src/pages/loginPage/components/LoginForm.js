import React, { useState } from "react";
import Button from "../../../components/button/Button";
import FormField from "../../../components/form /FormField";
import { getCurrentUser, login } from "../../../services/authService";

import { useSelector, useDispatch } from "react-redux";
import {
  requestUserData,
  receiveUsertData,
  receiveUserDataError,
} from "../../../store/reducers/user/actions";
import { Redirect, useHistory, useLocation } from "react-router";

function LoginForm() {
  const initialState = { email: "", password: "" };
  const dispatch = useDispatch();
  const history = useHistory();

  const { pathname, search, state } = useLocation();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(state, "pathname");

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    dispatch(requestUserData("loading"));

    try {
      const response = await login(formData);

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        // window.location = state ? state.from.pathname : '/'

        localStorage.setItem("token", responseBody.data);
        history.push(state.redirectTo);
      } else {
        throw responseBody;
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        console.log(error.message);
        dispatch(receiveUserDataError(error.message));
      }
    }
  };

  if (getCurrentUser()) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        name="email"
        label="Email"
        type="email"
        handleChange={handleChange}
        value={formData.email}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        handleChange={handleChange}
        value={formData.password}
      />

      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;
