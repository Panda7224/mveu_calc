const { Schema, model } = require('mongoose')

const User = new Schema({
    email:{
        type: String,
        required: true
    },
    credit: {
        type: String,        
        required: true
    }    
})

module.exports = model('User', User)