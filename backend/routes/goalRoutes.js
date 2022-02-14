const express = require('express')   
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const router = express.Router()    

// we can use a '/' as the first parameter because the endpoint is already defined 
// in our app.use() function in the server.js file. We are using router.get() instead
// of app.get(), which allows us to use the app.use() function from the server.js file

router.get('/', getGoals) 

router.post('/', setGoal) 

//we need to include the ID parameter in the endpoints for the put and delete requests
//because both of these http requests target a specific object. 

router.put('/:id', updateGoal) 

router.delete('/:id', deleteGoal) 

module.exports = router  