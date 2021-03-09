const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {PRIVATE_JWT} = process.env;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLenght: 5,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        minLenght: 5,
        maxLength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLenght: 5,
        maxLength: 1024,
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, PRIVATE_JWT)

    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user){

    const schema = {
        name: Joi.string()
            .alphanum()
            .min(5)
            .max(50)
            .required(),

        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
    
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(5)
            .max(255)
            .required(),
    };

    return Joi.validate(user, schema)
}


module.exports={User, validateUser}
