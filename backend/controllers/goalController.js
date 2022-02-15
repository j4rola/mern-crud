const asyncHandler = require('express-async-handler') 
const { findByIdAndUpdate } = require('../models/goalModel')
const GoalModel = require('../models/goalModel')

const getGoals = asyncHandler( async (req, res) => {
    const goals = await GoalModel.find()
    res.json(goals) 
}) 

const setGoal = asyncHandler( async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await GoalModel.create({
        text: req.body.text
    })

    res.json(goal)    
})

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById( req.params.id )

    if(!goal){
        res.status(400)
        throw new Error('Goal not found') 
    }

    const updated = await GoalModel.findByIdAndUpdate( req.params.id, req.body, { new: true }) //in mongoose, setting new to true creates an entity that matches the id that is passed in if none are found that match 

    res.json(updated)     
}) 

const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await GoalModel.findById( req.params.id )

    deleted = await GoalModel.findByIdAndDelete(goal)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found') 
    }

    res.json({'Message':`Deleted goal ${req.params.id}`}) 
}) 

module.exports = {
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal
}