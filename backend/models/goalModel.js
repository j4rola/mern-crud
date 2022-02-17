const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    //Defines goals relationship with user 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    text: {
        type: String,
        required: [true, "Please add a text value"] 
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Goal", goalSchema) // When we export this mongodb schema