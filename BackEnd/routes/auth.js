const express = require("express");
const router = express.Router();
const { authUser } = require("./handlers/handlersUser");

const { authUserGM } = require("./handlers/handleRegisterUser");

router.post("/", authUser);
router.post("/login", authUserGM);

module.exports = router;
