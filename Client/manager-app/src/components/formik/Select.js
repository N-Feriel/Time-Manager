import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-cont">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;
