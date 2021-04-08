const Joi = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  typeOneToOne: {
    type: String,
    required: false,
  },

  participants: {
    numberOfParticipants: { type: Number, default: 1 },
    participantsName: [String],
  },

  eventDate: {
    type: Date,
    defaut: Date.now(),
  },
  time: {
    type: Number,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
