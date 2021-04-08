const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { PRIVATE_JWT } = process.env;

const infoSchema1 = new mongoose.Schema({
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

const InfoGM = mongoose.model("InfoGM", infoSchema1);

const infoSchema2 = new mongoose.Schema({
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

const InfoGD = mongoose.model("InfoGD", infoSchema2);

module.exports = { InfoGD, InfoGM };
