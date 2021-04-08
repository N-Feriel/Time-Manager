const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../models/admin");
const { createUserGM, createUserGD } = require("./handlers/handleRegisterUser");

// router.post("/", [auth, admin], createUser);

// Create and update the GMother Info DataBase
router.post("/gMother", [auth, admin], createUserGM);

// Create and update the GDaughter Info DataBase
router.post("/gDaughter", [auth, admin], createUserGD);

module.exports = router;
