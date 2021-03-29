const _ = require("lodash");
const Joi = require("joi");

const mongoose = require("mongoose");
const { Event } = require("../../models/event");
const { UserGD } = require("../../models/user");

const getEvents = async (req, res) => {
  const events = await Event.find();

  if (!events)
    return res
      .status(400)
      .json({ status: 400, message: "can't find events in dataBase" });

  res.status(201).json({ status: 201, data: events });
};

const getEvent = async (req, res) => {
  const _id = req.params.eventId;

  const event = await Event.findById(_id);

  if (!event)
    return res.status(404).json({
      status: 404,
      message: "The event with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: event });
};

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.string().min(3).required(),
  participants: Joi.object({
    numberOfParticipants: Joi.number().required(),
    participantsName: Joi.array(),
  }),
  eventDate: Joi.date(),
  typeOneToOne: Joi.string(),
  time: Joi.number().required(),
});

const createEvent = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: 400, message: error.details[0].message });

  let eventInfo = await Event.findOne({ _id: req.body._id });

  if (eventInfo)
    return res
      .status(400)
      .json({ status: 400, message: "Event already exit try to updated" });

  eventInfo = new Event(req.body);

  await eventInfo.save();

  return res.status(201).json({
    status: 201,
    data: eventInfo,
  });
};

const updateEvent = async (req, res) => {
  const _id = req.params.eventId;

  const update = { ...req.body };

  const opts = { new: true, timestamps: { createdAt: false, updatedAt: true } };

  let eventUpdate = await Event.findByIdAndUpdate(_id, update, opts);

  if (!eventUpdate)
    return res.status(404).json({
      status: 404,
      message: "The event with the given Id is not found!",
    });

  res.status(201).json({ status: 201, data: eventUpdate });
};

const deleteEvent = async (req, res) => {
  const _id = req.params.eventId;

  let eventToRemove = await Event.findByIdAndRemove(_id);

  if (!eventToRemove)
    return res.status(404).json({
      status: 400,
      message: "The event with the given Id is not found!",
    });

  res.status(200).json({ status: 200, data: eventToRemove });
};

const getTotalEventUser = async (req, res) => {
  const _id = req.params.userId;

  let totalEvent = await Event.aggregate([
    { $match: { "participants.participantsName": { $all: [_id] } } },
    {
      $group: {
        _id: "$type",
        events: {
          $push: {
            name: "$name",
            eventDate: "$eventDate",
            time: "$time",
            typeOneToOne: "$typeOneToOne",
          },
        },
        total: { $sum: "$time" },
      },
    },
  ]);

  if (!totalEvent)
    return res
      .status(400)
      .json({ status: 400, message: "can't find events in dataBase" });

  res.status(200).json({
    status: 200,

    data: totalEvent,
  });
};

const getTotalTime = async (req, res) => {
  let totalEvent = await Event.aggregate([
    {
      $group: {
        _id: "$type",
        total: {
          $sum: { $multiply: ["$time", "$participants.numberOfParticipants"] },
        },
      },
    },
  ]);

  if (!totalEvent)
    return res
      .status(400)
      .json({ status: 400, message: "can't find events in dataBase" });

  res.status(200).json({
    status: 200,

    data: totalEvent,
  });
};

const getTotalEventType = async (req, res) => {
  const type = req.params.type;

  let totalEvent = await Event.aggregate([
    {
      $match: { type: { $all: [type] } },
    },
    {
      $group: {
        _id: null,
        events: {
          $push: {
            name: "$name",
            eventDate: "$eventDate",
            time: "$time",
            _id: "$_id",
            typeOneToOne: "$typeOneToOne",
          },
        },
        total: {
          $sum: { $multiply: ["$time", "$participants.numberOfParticipants"] },
        },
      },
    },
  ]);

  if (!totalEvent)
    return res
      .status(400)
      .json({ status: 400, message: "can't find events in dataBase" });

  res.status(200).json({
    status: 200,

    data: totalEvent,
  });
};

const getTotalEventTypePerUser = async (req, res) => {
  const { type, userId } = req.params;

  let totalEvent = await Event.aggregate([
    {
      $match: {
        $and: [
          { "participants.participantsName": { $all: [userId] } },
          { type: { $all: [type] } },
        ],
      },
    },
    {
      $group: {
        _id: null,
        events: {
          $push: {
            name: "$name",
            eventDate: "$eventDate",
            time: "$time",
            typeOneToOne: "$typeOneToOne",
          },
        },
        total: {
          $sum: { $multiply: ["$time", "$participants.numberOfParticipants"] },
        },
      },
    },
  ]);

  if (!totalEvent)
    return res
      .status(400)
      .json({ status: 400, message: "can't find events in dataBase" });

  res.status(200).json({
    status: 200,

    data: totalEvent,
  });
};

const getTotalTimeOneToOne = async (req, res) => {
  const { gdId } = req.params;

  // let totalTime = await Event.aggregate([
  //   { $match: { "participants.participantsName": { $all: [gdId, gMId] } } },
  //   { $group: { _id: null, total: { $sum: "$time" } } },
  // ]);

  const userInfo = await UserGD.findById(gdId);
  const gMId = userInfo.assignTo.assignGM;

  let totalTime = await Event.aggregate([
    { $match: { "participants.participantsName": { $all: [gdId, gMId] } } },
    { $group: { _id: null, total: { $sum: "$time" } } },
  ]);

  if (!totalTime)
    return res
      .status(404)
      .json({ status: 400, message: "can not calculate the total time" });

  res.status(200).json({
    status: 200,
    total: totalTime,
  });
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getTotalTimeOneToOne,
  getTotalEventUser,
  getTotalEventType,
  getTotalEventTypePerUser,
  getTotalTime,
};
