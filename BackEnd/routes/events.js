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
  getTotalOneToOne,
} = require("./handlers/handelersEvent");

router.get("/", getEvents);
router.get("/:eventId", [auth, admin], getEvent);
router.post("/", auth, createEvent);

router.get("/stat/totalTime", [auth, admin], getTotalTime);
router.get("/totalTime/:userId", getTotalEventUser);
router.get("/events/:type", getTotalEventType);
router.get("/totalTime/:type/:userId", getTotalEventTypePerUser);
router.patch("/:eventId", [auth, admin], updateEvent);
router.delete("/:eventId", [auth, admin], deleteEvent);

router.get("/oneToOne/totalTime/:gdId", auth, getTotalTimeOneToOne);
router.get("/oneToOne/totalTime", auth, getTotalOneToOne);

module.exports = router;
