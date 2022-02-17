const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const guard = asyncHandler(async(req, res, next) => {

    let token 
    let auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer')) {

        
        try {

            //Get token from header 
            token = auth.split(' ')[1]   

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
            //Get the current user by the ID in the JWT
            req.user = await User.findById(decoded.id).select('-password') 

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized for this page')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Your session has expired')
    }
})

module.exports = { guard } 