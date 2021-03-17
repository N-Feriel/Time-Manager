const bcrypt = require('bcrypt')
require('dotenv').config();
const _ = require('lodash');
const Joi = require('joi');
const{InfoGD, InfoGM} = require('../../models/info')



const getUsersGMInfo = async(req, res)=>{

    const infoUsers = await InfoGM.find();

    if(!infoUsers) return res.status(400).json({ status: 400, message:"can't find Users in dataBase"})
    
    res.status(201).json({ status: 201, data: infoUsers}); 

}

const getUserGMInfo = async(req, res)=>{

    const _id = req.params.userId;

    const userInfo = await InfoGM.findById(_id);

    if(!userInfo) return res.status(404).json({ status: 404, message:"The user with the given Id is not found!"});

    res.status(200).json({ status: 200, data: userInfo}); 
}



const createUserGMInfo = async(req, res)=>{

    const schema = Joi.object({ 
        first_name: Joi.string() .min(4) .required(),
        last_name: Joi.string() .min(4) .required(),
        email: Joi.string() .min(6) .required() .email(),
        address:  Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            zipCode: Joi.string(),
            state: Joi.string(),

        }),
        phone: Joi.string(),
        origin: Joi.string(),
        languages: Joi.array().items(Joi.string()),
        training: Joi.array(),
        isAdmin: Joi.boolean(),
        isActif: Joi.boolean(),
        isMember: Joi.boolean(),
        startDate: Joi.string()
    });

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).json({ status: 400, message: error.details[0].message}); 

    let userInfo = await InfoGM.findOne({email: req.body.email})

    if(userInfo) return res.status(400).json({ status: 400, message:"User already registed"});


    userInfo = new InfoGM(req.body)

    await userInfo.save()

    return res.status(201).json({
        status: 201,
        data: userInfo
    })
}

const updateUserGMInfo = async(req, res) =>{

    const filter = {_id: req.body._id};
    const update = {...req.body}
    delete update._id;

    console.log(req.body)
    const opts = {new: true,
        timestamps:{createdAt:false, updatedAt:true}};

    let userInfoUpdate = await InfoGM.findOneAndUpdate(filter, update, opts);
    
    if(!userInfoUpdate) return res.status(400).json({ status: 400, message:"Can not find the user"});

    res.status(201).json({status: 201,data: userInfoUpdate})

}

const deleteUserGMInfo = async(req, res)=> {
        
    const _id = req.params.userId;
    
    let userInfoToRemove = await InfoGM.findByIdAndRemove(_id);

    if(!userInfoToRemove) return res.status(404).json({ status: 400,  message:"The event with the given Id is not found!"});
    
    res.status(200).json({status: 200,data: userInfoToRemove})
}

const getUsersGDInfo = async(req, res)=>{

    const infoUsers = await InfoGD.find();


    if(!infoUsers) return res.status(400).json({ status: 400, message:"can't find Users in dataBase"})
    
    res.status(201).json({ status: 200, data: infoUsers}); 

}

const getUserGDInfo = async(req, res)=>{

    const _id = req.params.userId;
    const userInfo = await InfoGD.findById(_id);

    

    if(!userInfo) return res.status(404).json({ status: 404, message:"The user with the given Id is not found!"});

    res.status(200).json({ status: 200, data: userInfo}); 

}

const createUserGDInfo = async(req, res)=>{

    const schema = Joi.object({ 
        first_name: Joi.string() .min(4) .required(),
        last_name: Joi.string() .min(4) .required(),
        email: Joi.string() .min(6) .required() .email(),
        phone: Joi.string(),
        address:  Joi.object({
            city: Joi.string(),
            street: Joi.string(),
            zipCode: Joi.string(),
            state: Joi.string(),
        }),
        infoParent: Joi.object(
            {name: Joi.string()},
            {isContact: Joi.boolean()}
        ),
        assignTo: Joi.object(
            {assignGM: Joi.string()},
            {isAssign: Joi.boolean()}
        ),
        isActif: Joi.boolean(),
        origin: Joi.string(),
        isMember: Joi.boolean(),
        dueDate: Joi.date(),
    });

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).json({ status: 400, message: error.details[0].message}); 

    let userInfo = await InfoGD.findOne({email: req.body.email})

    if(userInfo) return res.status(400).json({ status: 400, message:"User already registed"});


    userInfo = new InfoGD(req.body)

    await userInfo.save()

    return res.status(201).json({
        status: 201,
        data: userInfo
    })
}

const updateUserGDInfo = async(req, res) =>{

    const filter = {_id: req.body._id};
    const update = {...req.body}
    delete update._id;

    const opts = {new: true,
        timestamps:{createdAt:false, updatedAt:true}};
    let userInfoUpdate = await InfoGD.findOneAndUpdate(filter, update, opts);
    
    if(!userInfoUpdate) return res.status(400).json({ status: 400, message:"Can not find the user"});

    res.status(201).json({status: 201,data: userInfoUpdate})

}

const deleteUserGDInfo = async(req, res)=>{

    const _id = req.params.userId;
    
    let userInfoToRemove = await InfoGD.findByIdAndRemove(_id);

    if(!userInfoToRemove) return res.status(404).json({ status: 400,  message:"The event with the given Id is not found!"});
    
    res.status(200).json({status: 200,data: userInfoToRemove})
}


module.exports={

    getUsersGMInfo,
    getUserGMInfo,
    createUserGMInfo,
    updateUserGMInfo,
    deleteUserGMInfo,
    getUsersGDInfo,
    getUserGDInfo,
    createUserGDInfo,
    updateUserGDInfo,
    deleteUserGDInfo,
}