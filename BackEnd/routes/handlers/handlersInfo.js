const bcrypt = require("bcrypt");
require("dotenv").config();
const _ = require("lodash");
const Joi = require("joi");
const { UserGD, UserGM } = require("../../models/user");

const getUsersGMInfo = async (req, res) => {
  const infoUsers = await UserGM.find().select("-password");

  if (!infoUsers)
    return res
      .status(400)
      .json({ status: 400, message: "can't find Users in dataBase" });

  res.status(200).json({ status: 200, data: infoUsers });
};

const getUserGMInfo = async (req, res) => {
  const _id = req.params.userId;

  const userInfo = await UserGM.findById(_id).select("-password");

  if (!userInfo)
    return res.status(404).json({
      status: 404,
      message: "The user with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: userInfo });
};

const getTotalUser = async (req, res) => {
  const { userType } = req.params;

  let totalUser = [];

  if (userType == "gMother") {
    totalUser = await UserGM.aggregate([
      {
        $group: {
          _id: "$isActif",
          // total: { $sum: "$time" },
          count: { $sum: 1 },
        },
      },
    ]);
  } else if (userType == "gDaughter") {
    totalUser = await UserGD.aggregate([
      {
        $group: {
          _id: "$isActif",
          // total: { $sum: "$time" },
          count: { $sum: 1 },
        },
      },
    ]);
  }

  if (!totalUser)
    return res
      .status(400)
      .json({ status: 400, message: "can't find users in dataBase" });

  res.status(200).json({
    status: 200,

    data: totalUser,
  });
};

const updateUserGMInfo = async (req, res) => {
  const filter = { _id: req.body._id };
  const update = { ...req.body };
  delete update._id;

  const opts = { new: true, timestamps: { createdAt: false, updatedAt: true } };

  let userInfoUpdate = await UserGM.findOneAndUpdate(
    filter,
    update,
    opts
  ).select("-password");

  if (!userInfoUpdate)
    return res
      .status(400)
      .json({ status: 400, message: "Can not find the user" });

  res.status(201).json({ status: 201, data: userInfoUpdate });
};

const deleteUserGMInfo = async (req, res) => {
  const _id = req.params.userId;

  let userInfoToRemove = await UserGM.findByIdAndRemove(_id);

  if (!userInfoToRemove)
    return res.status(404).json({
      status: 400,
      message: "The event with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: userInfoToRemove });
};

const getUsersGDInfo = async (req, res) => {
  const infoUsers = await UserGD.find();

  if (!infoUsers)
    return res
      .status(400)
      .json({ status: 400, message: "can't find Users in dataBase" });

  res.status(201).json({ status: 200, data: infoUsers });
};

const getUserGDInfo = async (req, res) => {
  const _id = req.params.userId;
  const userInfo = await UserGD.findById(_id);

  if (!userInfo)
    return res.status(404).json({
      status: 404,
      message: "The user with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: userInfo });
};

const getUsersGDAssignTo = async (req, res) => {
  // const _idGD = req.user._id

  const _idGD = req.user._id;

  const GDUsers = await UserGD.find({ "assignTo.assignGM": _idGD });

  if (!GDUsers)
    return res
      .status(400)
      .json({ status: 400, message: "can't find Users in dataBase" });

  res.status(200).json({ status: 200, data: GDUsers });
};

const getGMotherList = async (req, res) => {
  const gMotherList = await UserGM.aggregate([
    { $match: { isActif: { $all: [true] } } },
    {
      $group: {
        _id: null,
        listUsers: {
          $push: {
            key: "$email",
            first_name: "$first_name",
            last_name: "$last_name",
            _id: "$_id",
            value: "$_id",
          },
        },
      },
    },
  ]);

  if (!gMotherList)
    return res
      .status(400)
      .json({ status: 400, message: "can't find Users in dataBase" });

  res.status(200).json({ status: 200, data: gMotherList });
};

const getGDAssignToData = async (req, res) => {
  // const _idGD = req.user._id

  const _idGM = req.params.userId;

  const GDUsers = await UserGD.find({ "assignTo.assignGM": _idGM });

  if (!GDUsers)
    return res
      .status(400)
      .json({ status: 400, message: "can't find Users in dataBase" });

  const actifsGD = GDUsers.filter((GD) => GD.isActif == true);
  const archivesGD = GDUsers.filter((GD) => GD.isActif == false);

  res
    .status(200)
    .json({ status: 200, data: { archives: archivesGD, actifs: actifsGD } });
};

const updateUserGDInfo = async (req, res) => {
  const { _id, email } = req.body;

  const filter = _id ? { _id: _id } : { email: email };
  const update = { ...req.body };
  delete update._id;

  const opts = { new: true, timestamps: { createdAt: false, updatedAt: true } };
  let userInfoUpdate = await UserGD.findOneAndUpdate(filter, update, opts);

  if (!userInfoUpdate)
    return res
      .status(400)
      .json({ status: 400, message: "Can not find the user" });

  res.status(201).json({ status: 201, data: userInfoUpdate });
};

const deleteUserGDInfo = async (req, res) => {
  const _id = req.params.userId;

  let userInfoToRemove = await UserGD.findByIdAndRemove(_id);

  if (!userInfoToRemove)
    return res.status(400).json({
      status: 400,
      message: "The event with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: userInfoToRemove });
};

const getUsersGDStatus = async (req, res) => {
  const statusType = req.params.statusType;

  let GDUsers;

  if (statusType == "active") {
    GDUsers = await UserGD.find({ isActif: true });
  } else if (statusType == "archive") {
    GDUsers = await UserGD.find({ isActif: false });
  } else if (statusType == "toAssign") {
    GDUsers = await UserGD.find({ "assignTo.assignGM": "" });
  }

  if (!GDUsers)
    return res.status(400).json({
      status: 400,
      message: "The selected status is not defined!",
    });

  res.status(200).json({ status: 200, data: GDUsers });
};

module.exports = {
  getUsersGMInfo,
  getUserGMInfo,
  getGMotherList,
  getTotalUser,
  updateUserGMInfo,
  deleteUserGMInfo,
  getUsersGDInfo,
  getUserGDInfo,
  getUsersGDStatus,
  // createUserGDInfo,
  updateUserGDInfo,
  deleteUserGDInfo,
  getUsersGDAssignTo,
  getGDAssignToData,
};
