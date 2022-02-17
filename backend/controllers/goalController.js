const asyncHandler = require('express-async-handler') 
const { findByIdAndUpdate } = require('../models/goalModel')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler( async (req, res) => {

    const goals = await Goal.find({ user: req.user.id})
    res.json(goals) 

}) 


const setGoal = asyncHandler( async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.json(goal)    
})


const updateGoal = asyncHandler(async (req, res) => { 

    const goal = await Goal.findById( req.params.id )  

    if(!goal){

        res.status(400)
        throw new Error('Goal not found')   
    }

    const user = await User.findById(req.user.id)  //Note that req.user comes from the jwt in the authguard, so it is a true reflection of the logged in user         

    //Check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found') 
    }

    //Make sure that user ID matches user ID on the goal 
    if(user.id !== goal.user.toString()) {
        res.status(401)
        throw new Error("You don't have permission to edit this")
    }

    const updated = await Goal.findByIdAndUpdate( req.params.id, req.body, { new: true }) //in mongoose, setting new to true creates an entity that matches the id that is passed in if none are found that match 

    res.json(updated)     
}) 


const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById( req.params.id )

    await Goal.findByIdAndDelete(goal)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found') 
    }

    const user = await User.findById(req.user.id)

    //Check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found') 
    }

    //Make sure that user ID matches user ID on the goal 
    if(user.id !== goal.user.toString()) {
        res.status(401)
        throw new Error("You don't have permission to edit this")
    }

    res.json({'id':req.params.id})  

}) 

module.exports = {
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal
}