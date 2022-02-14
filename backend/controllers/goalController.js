const asyncHandler = require('express-async-handler') 

const getGoals = asyncHandler( async (req, res) => {
    res.json({'Message':'Get Goals'}) 
}) 

const setGoal = asyncHandler( async (req, res) => {
    if(!req.body.myKey){
        res.status(400)
        throw new Error('please add a myKey field')
        
    }
    res.json({'Message':'Set Goal'})    
})

const updateGoal = asyncHandler(async (req, res) => {
    res.json({'Message':`Updated goal ${req.params.id}`})   
}) 

const deleteGoal = asyncHandler(async (req, res) => {
    res.json({'Message':`Deleted goal ${req.params.id}`}) 
}) 

module.exports = {
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal
}