const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { PRIVATE_JWT } = process.env;

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLenght: 4,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLenght: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      first_name: this.first_name,
      last_name: this.last_name,
    },
    PRIVATE_JWT
  );

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().alphanum().min(5).max(50).required(),

    password: Joi.string().min(5).max(255).required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(user, schema);
}

//Create GM data Base

const GMotherSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 255,
    unique: true,
  },
  address: {
    city: String,
    street: String,
    zipCode: String,
  },
  password: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 1024,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  languages: [String],

  isAdmin: {
    type: Boolean,
    default: false,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isActif: {
    type: Boolean,
    default: false,
  },

  training: [String],
});

GMotherSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    },
    PRIVATE_JWT
  );

  return token;
};

const UserGM = mongoose.model("UserGM", GMotherSchema);

const GDaugtherSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  origin: {
    type: String,
  },

  origin: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 255,
    unique: true,
  },
  address: {
    city: String,
    street: String,
    zipCode: String,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },

  isActif: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  infoParent: {
    name: { type: String },
    isContact: { type: Boolean },
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isActif: {
    type: Boolean,
    default: false,
  },
  assignTo: {
    isAssign: { type: Boolean },
    assignGM: { type: String },
  },
});

const UserGD = mongoose.model("UserGD", GDaugtherSchema);

module.exports = { User, validateUser, UserGD, UserGM };
