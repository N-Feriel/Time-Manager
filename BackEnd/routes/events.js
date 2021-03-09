const express = require('express');
const router = express.Router();
const {getEvents,
    getEvent,
    createEvent, 
    updateEvent,
    deleteEvent} = require('./handlers/handelersEvent')

router.get('/', getEvents )
router.get('/:eventId', getEvent)
router.post('/', createEvent)
router.patch('/:eventId', updateEvent)
router.delete('/:eventId', deleteEvent)

module.exports= router