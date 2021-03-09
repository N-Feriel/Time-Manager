const express = require('express');
const router = express.Router();
const { authUser}= require('./handlers/handlersUser');


router.post('/', authUser)


module.exports= router