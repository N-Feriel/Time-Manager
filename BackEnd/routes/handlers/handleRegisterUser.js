const bcrypt = require("bcrypt");
require("dotenv").config();
const _ = require("lodash");
const Joi = require("joi");
const { UserGM, UserGD } = require("../../models/user");

const createUserGM = async (req, res) => {
  // Simple validation

  const { first_name, last_name, email, password, phone } = req.body;

  if (!last_name || !first_name || !email || !password || !phone) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await UserGM.findOne({ email: req.body.email });

    if (user) {
      throw Error("User already registed");
    }

    user = new UserGM(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const savedUserGM = await user.save();

    if (!savedUserGM) throw Error("Something went wrong saving the user");
    res.status(201).json({
      status: 201,
      data: _.pick(savedUserGM, [
        "first_name",
        "last_name",
        "isAdmin",
        "email",
      ]),
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

const createUserGD = async (req, res) => {
  // Simple validation

  const { first_name, last_name, email, phone } = req.body;

  if (!last_name || !first_name || !email || !phone) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await UserGD.findOne({ email: req.body.email });

    if (user) {
      throw Error("User already registed");
    }

    user = new UserGD(req.body);

    const savedUserGD = await user.save();

    if (!savedUserGD) throw Error("Something went wrong saving the user");
    res.status(201).json({
      status: 201,
      data: _.pick(savedUserGD, ["first_name", "last_name", "email"]),
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

//handle login

const authUserGM = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });

  let user = await UserGM.findOne({ email: req.body.email });

  if (!user)
    return res.status(400).json({
      status: 400,
      message: "Invalid email or password.",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      status: 400,
      message: "Invalid email or password.",
    });

  const token = user.generateAuthToken();
  // res.send(token);

  res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .json({
      status: 200,
      data: token,
    });
};

module.exports = {
  createUserGM,
  createUserGD,
  authUserGM,
};
