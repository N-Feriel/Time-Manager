import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormField from "./FormField";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const onSubmit = (values) => console.log(values);
const validate = (values) => {
  let errors = {};

  return errors;
};

const validateSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid Email").required("Required"),
  password: Yup.string().required("Required"),
});

function UserForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <Field name="name" label="Name" type="text" />
          <ErrorMessage name="name" />
        </div>

        <div>
          <Field name="email" label="Email" type="text" />
          <ErrorMessage name="email" />
        </div>

        <div>
          <Field name="password" label="Password" type="text" />
          <ErrorMessage name="email" />
        </div>
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
}

export default UserForm;
