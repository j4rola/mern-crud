const express = require('express')   
const { getUsers, registerUser, loginUser, getMe } = require('../controllers/userController')
const router = express.Router()   
const { guard } = require('../middleware/guard')

router.post('/', registerUser)       
router.post('/login', loginUser)       
router.get('/', guard, getUsers)     
router.get('/me', guard, getMe)      


module.exports = router    