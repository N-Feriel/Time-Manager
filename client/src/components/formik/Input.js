import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function Input(props) {
  const { label, name, isCheckBox, ...rest } = props;
  return (
    <div className={`form-cont ${isCheckBox ? "check" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
