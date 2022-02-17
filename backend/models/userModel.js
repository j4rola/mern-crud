const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a value for name"] 
    },
    email: {
        type: String,
        required: [true, "Please add a value for email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a value for password"] 
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)   