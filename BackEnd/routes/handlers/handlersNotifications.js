const bcrypt = require("bcrypt");
require("dotenv").config();
const _ = require("lodash");
const { Notification } = require("../../models/notification");

const { UserGM } = require("../../models/user");

const createNotification = async (req, res) => {
  // Simple validation

  const { name, userId, sendBy, isSeen } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await UserGM.findById(req.body.userId).select("-password");

    if (!user) {
      throw Error("User don't exist");
    }

    let notification = new Notification(req.body);

    const savedNotification = await notification.save();

    if (!savedNotification)
      throw Error("Something went wrong saving the notification");
    res.status(201).json({
      status: 201,
      data: savedNotification,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const getNotifications = async (req, res) => {
  const notifications = await Notification.find();

  if (!notifications)
    return res
      .status(400)
      .json({ status: 400, message: "can't find Notifications in dataBase" });

  res.status(201).json({ status: 200, data: notifications });
};

const getNotification = async (req, res) => {
  const _id = req.params.notificationId;
  const notification = await Notification.findById(_id);

  if (!notification)
    return res.status(404).json({
      status: 404,
      message: "The Notification with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: notification });
};

const updateNotification = async (req, res) => {
  const filter = { _id: req.body._id };
  const update = { ...req.body };
  delete update._id;

  const opts = { new: true, timestamps: { createdAt: false, updatedAt: true } };
  let notificationUpdate = await Notification.findOneAndUpdate(
    filter,
    update,
    opts
  );

  if (!notificationUpdate)
    return res
      .status(400)
      .json({ status: 400, message: "Can not find the notification" });

  res.status(201).json({ status: 201, data: notificationUpdate });
};

const deleteNotification = async (req, res) => {
  const _id = req.params.notificationId;

  let notificationToRemove = await Notification.findByIdAndRemove(_id);

  if (!notificationToRemove)
    return res.status(400).json({
      status: 400,
      message: "The notification with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: notificationToRemove });
};

const getNotificationsUser = async (req, res) => {
  const _idUser = req.user._id;

  const notificationsUser = await Notification.aggregate([
    { $match: { userId: { $all: [_idUser] } } },
    {
      $group: {
        _id: "$isSeen",
        notifications: {
          $push: {
            name: "$name",
            userId: "$userId",
            eventDate: "$eventDate",
            _id: "$_id",
            clientId: "$clientId",
            isSeen: "$isSeen",
          },
        },
      },
    },
  ]);

  if (!notificationsUser)
    return res.status(400).json({
      status: 400,
      message: "can't find notifications for the user in dataBase",
    });

  res.status(200).json({ status: 200, data: notificationsUser });
};

module.exports = {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
  getNotificationsUser,
};
