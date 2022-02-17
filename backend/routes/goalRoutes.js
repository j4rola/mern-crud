const express = require('express')   
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { guard } = require('../middleware/guard')
const router = express.Router()    

// we can use a '/' as the first parameter because the endpoint is already defined 
// in our app.use() function in the server.js file. We are using router.get() instead
// of app.get(), which allows us to use the app.use() function from the server.js file

//The below router methods are programming set behaviors for each kind of http request that is made to the server. For example,
//every time a get request is made to the goals endpoint, the getGoals function is called. 

router.get('/', guard, getGoals) 

router.post('/', guard, setGoal) 

//we need to include the ID parameter in the endpoints for the put and delete requests
//because both of these http requests target a specific object. 

router.put('/:id', guard, updateGoal) 

router.delete('/:id', guard, deleteGoal) 

module.exports = router  