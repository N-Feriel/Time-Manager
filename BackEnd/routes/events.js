const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../models/admin");

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  getTotalTimeOneToOne,
  deleteEvent,
  getTotalEventUser,
  getTotalEventType,
  getTotalEventTypePerUser,
  getTotalTime,
} = require("./handlers/handelersEvent");

router.get("/", getEvents);
router.get("/:eventId", getEvent);
router.post("/", createEvent);

router.get("/stat/totalTime", [auth, admin], getTotalTime);
router.get("/totalTime/:userId", getTotalEventUser);
router.get("/events/:type", getTotalEventType);
router.get("/totalTime/:type/:userId", getTotalEventTypePerUser);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

router.get("/oneToOne/totalTime/:gdId", auth, getTotalTimeOneToOne);

module.exports = router;
