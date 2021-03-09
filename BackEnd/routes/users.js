
const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../models/admin");
const {getUsers,getUser, createUser}= require('./handlers/handlersUser');
const { createUserGMInfo,
    updateUserGMInfo,
    createUserGDInfo,
    updateUserGDInfo,
    deleteUserGMInfo,
    deleteUserGDInfo,
    getUsersGMInfo,
    getUserGMInfo,
    getUsersGDInfo,
    getUserGDInfo
} = require('./handlers/handlersInfo');


router.get('/',getUsers)
router.get('/me', auth, getUser)

router.post('/', auth,admin, createUser)

// Create and update the GMother Info DataBase
router.get('/infoGMother', getUsersGMInfo)
router.get('/infoGMother/:userId', getUserGMInfo)
router.post('/infoGMother', createUserGMInfo)
router.patch('/infoGMother/user', updateUserGMInfo)
router.delete('/infoGMother/:userId', deleteUserGMInfo)



// Create and update the GMother Info DataBase
router.get('/infoGDaughter', getUsersGDInfo)
router.get('/infoGDaughter/:userId', getUserGDInfo)
router.post('/infoGDaughter', createUserGDInfo)
router.patch('/infoGDaughter/user', updateUserGDInfo)
router.delete('/infoGDaughter/:userId', deleteUserGDInfo)


module.exports= router