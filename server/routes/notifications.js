const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../models/admin");

const {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
  getNotificationsUser,
} = require("./handlers/handlersNotifications");

router.get("/", getNotifications);
router.get("/:notificationId", getNotification);
router.patch("/:notificationId", updateNotification);
router.delete("/:notificationId", deleteNotification);
router.get("/totalNotifications/user", auth, getNotificationsUser);
router.post("/", createNotification);

module.exports = router;
