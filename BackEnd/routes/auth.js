const express = require("express");
const router = express.Router();
const { authUser } = require("./handlers/handlersUser");
const { changeUserPassword } = require("./handlers/handleRegisterUser");

const { authUserGM } = require("./handlers/handleRegisterUser");
const auth = require("../middleware/auth");

router.post("/", authUser);
router.post("/login", authUserGM);

router.post("/login/changePassword", auth, changeUserPassword);

module.exports = router;
