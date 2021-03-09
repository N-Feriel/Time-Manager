const _ = require('lodash')
const Joi = require('joi');

const mongoose = require('mongoose');
const {Event} = require('../../models/event')


const getEvents = async(req, res)=>{

    const events = await Event.find();

    if(!events) return res.status(400).json({ status: 400, message:"can't find events in dataBase"})
    
    res.status(201).json({ status: 201, data: events}); 
}

const getEvent = async(req, res)=>{

    const _id = req.params.eventId;

    const event = await Event.findById(_id)

    if(!event) return res.status(404).json({ status: 404, message:"The event with the given Id is not found!"});

    res.status(200).json({ status: 200, data: event}); 
}

const schema = Joi.object({ name: Joi.string() .min(3) .required(),
    participents: Joi.object({
        numberOfParticipants: Joi.number().required(),
        participentsName: Joi.array(),
    }),
    date: Joi.date(),
    time: Joi.number().required(),
});

const createEvent = async(req, res)=>{

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).json({ status: 400, message: error.details[0].message}); 

    let eventInfo = await Event.findOne({_id: req.body._id})
    
    if(eventInfo) return res.status(400).json({ status: 400, message:"Event already exit try to updated"});

    eventInfo = new Event(req.body)

    await eventInfo.save()

    return res.status(201).json({
        status: 201,
        data: eventInfo
    })
}

const updateEvent = async(req, res) =>{

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).json({ status: 400, message: error.details[0].message}); 
    
    const _id = req.params.eventId

    const update = {...req.body}
    
    const opts = {new: true,
        timestamps:{createdAt:false, updatedAt:true}};
    
    let eventUpdate = await Event.findByIdAndUpdate(_id, update, opts);

    if(!eventUpdate) return res.status(404).json({ status: 404, message:"The event with the given Id is not found!"});

    res.status(201).json({status: 201,data: eventUpdate})

}

const deleteEvent = async(req, res) =>{
    
    
    const _id = req.params.eventId
    
    
    let eventToRemove = await Event.findByIdAndRemove(_id);

    if(!eventToRemove) return res.status(404).json({ status: 400,  message:"The event with the given Id is not found!"});
    
    res.status(200).json({status: 200,data: eventToRemove})

}


module.exports={
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}