import { ErrorMessage, Field } from "formik";
import React from "react";
import DateView from "react-datepicker";
import TextError from "./TextError";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div
      className="form-cont"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={(value && new Date(value)) || null}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DatePicker;
