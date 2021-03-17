const bcrypt = require('bcrypt')
require('dotenv').config();
const _ = require('lodash')
const Joi = require('joi');

const mongoose = require('mongoose');
const{User, validateUser} = require('../../models/user')



const getUsers = async(req, res)=>{

    const users = await User.find();

    if(!users) return res.status(400).json({ status: 400, message:"can't find users dataBase"})
    
    res.status(201).json({ status: 201, data: users}); 
}

const getUser = async(req, res)=>{

    const user = await User.findById(req.user._id).select('-password')

    res.status(200).json({ status: 200, data: user}); 
}

const createUser = async(req, res)=>{

    const schema = Joi.object({ name: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() });
                

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).json({ status: 400, message: error.details[0].message}); 

    let user = await User.findOne({email: req.body.email})

    if(user) return res.status(400).json({ status: 400, message:"User already registed"});

    user = new User(_.pick(req.body, ['name', 'email', 'password']))


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();
    
    const token = user.generateAuthToken();

    return res.header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .status(201).json({ status: 201, data: _.pick(user, ['_id', 'name', 'email'])}); 
}


const authUser = async(req, res)=>{

    console.log('req', req.body)
    
    const schema = Joi.object({ email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()});
        
    const {error} = schema.validate(req.body)
    

    if (error) return res.status(400).json({
        status: 400, 
        message: error.details[0].message
    })

    let user = await User.findOne({email: req.body.email})

    if (!user) return res.status(400).json({
        status: 400, 
        message: 'Invalid email or password.'
    })

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({
        status: 400, 
        message: 'Invalid email or password.'
    })

    const token = user.generateAuthToken();
    // res.send(token)

    res.status(200).json({
        status: 200, 
        data: token
    })

}


module.exports={getUsers, 
        getUser,
        createUser,
        authUser}
