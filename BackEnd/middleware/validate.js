const yup = require("yup");

module.exports = ({ shape, path = "query" }) => async (req, res, next) => {
  const schema = yup.object().shape(shape);

  try {
    const validData = await schema.validate(req[path]);
    req.validData = validData;
    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .min(3, "Name must be at least 3 characters"),
  age: yup
    .number()
    .required("Please supply your age")
    .min(18, "You must be at least 18 years")
    .max(60, "You must be at most 60 years"),
  email: yup.string().email().required("Email is a required field"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),
});

//const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const schema2 = yup.object().shape({
  phone: yup.string().matches(phoneRegex, "Invalid phone."),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mismatched passwords")
    .required("Please confirm your password"),
});
