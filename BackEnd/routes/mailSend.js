const express = require("express");
const router = express.Router();
const {
  firstMail,
  getNewGDaughterMail,
} = require("./handlers/handleSendEmail");

router.post("/", firstMail);
router.post("/assignto", getNewGDaughterMail);

module.exports = router;
