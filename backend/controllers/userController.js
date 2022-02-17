const asyncHandler = require('express-async-handler') 
const { findByIdAndUpdate } = require('../models/userModel')
const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const getUsers = asyncHandler( async (req, res) => { 
    const users = await UserModel.find()
    res.json(users) 
})

const registerUser = asyncHandler(async (req, res) => {      

    //form validation
    const { name, email, password } = req.body 
    if (!name || !email || !password) {
        throw new Error('Please ensure all fields are filled')   
    }

    //check if user exists
    const userExists = await User.findOne({email}) 

    if (userExists) {
        res.status(400)
        throw new Error('A user with this email already exists')  
    }

    //Hash password with bcrypt 
    const salt = await bcrypt.genSalt(10) 
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user 
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        token: getJWT(req.body.id) 

    })

    if (user) {
        res.status(201).json({

            _id: user.id,
            name: user.name,
            email: user.email
        
        })
       
    }  else {
        res.status(400)
        throw new Error('invalid user data')
    }
  
})

const loginUser = asyncHandler(async (req, res) => { 
    const { email, password } = req.body  

    //check for user email
    const user = await User.findOne({email}) 

    if (user && (bcrypt.compare(password, user.password)))
    {
        res.json({   

            _id: user.id,
            name: user.name,
            email: user.email,
            token: getJWT(user._id)
        })

    } else {
        res.status(400)
        throw new Error('The username and password combination you have entered is invalid')
    }

})         

const getMe = asyncHandler(async (req, res) => {
    
    const { _id, name, email } = await User.findById(req.user.id) //We can use req.user here because we assigned req.user a value in our guard function, and the getMe function is protected by the guard
    

    res.status(200).json({id: _id, name, email}) 
})

//Generate a JWT 
const getJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10d' 
    })
}

module.exports = {
    registerUser,
    getUsers,
    getMe,
    loginUser
}