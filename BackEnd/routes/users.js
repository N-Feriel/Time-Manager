const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../models/admin");
const { getUsers, getUser, createUser } = require("./handlers/handlersUser");
const {
  // createUserGMInfo,
  updateUserGMInfo,
  // createUserGDInfo,
  updateUserGDInfo,
  deleteUserGMInfo,
  deleteUserGDInfo,
  getUsersGMInfo,
  getUserGMInfo,
  getUsersGDInfo,
  getUserGDInfo,
  getTotalUser,
  getUsersGDAssignTo,
  getGDAssignToData,
} = require("./handlers/handlersInfo");

router.get("/", getUsers);
router.get("/me", auth, getUser);

router.post("/", [auth, admin], createUser);

// Create and update the GMother Info DataBase
router.get("/infoGMother", getUsersGMInfo);
router.get("/stat/:userType", getTotalUser);
router.get("/infoGMother/:userId", getUserGMInfo);
// router.post("/infoGMother", createUserGMInfo);
router.patch("/infoGMother/user", updateUserGMInfo);
router.delete("/infoGMother/:userId", deleteUserGMInfo);

// Create and update the GDaughter Info DataBase
router.get("/infoGDaughter", getUsersGDInfo);
router.get("/infoGDaughter/:userId", getUserGDInfo);
router.get("/GDaugherList", auth, getUsersGDAssignTo);
router.get("/GDaugherList/:userId", auth, getGDAssignToData);

// router.post("/infoGDaughter", [auth, admin], createUserGDInfo);
router.patch("/infoGDaughter/user", auth, updateUserGDInfo);
router.delete("/infoGDaughter/:userId", [auth, admin], deleteUserGDInfo);

module.exports = router;
