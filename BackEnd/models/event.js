const Joi = require('joi');
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    participents: {
            numberOfParticipants: {type: Number},
            participentsName: [String]
    },

    date:{
        type: Date,
        defaut: Date.now(),
    },
    time:{
        type: Number,
        required: true
    },

})

const Event = mongoose.model('Event', eventSchema)

module.exports={Event}



