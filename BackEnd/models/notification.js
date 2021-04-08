const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },

  sendById: {
    type: String,
    required: false,
  },
  isSeen: {
    type: Boolean,
    required: true,
  },

  eventDate: {
    type: Date,
    defaut: Date.now(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };
