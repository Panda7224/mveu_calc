const { Schema, model } = require('mongoose')

const Calculator = new Schema({
    name: {
        type: String,
        required: true
    },
    rate:{
        type: Number
    },
    minimum:{
        type: Number
    }   
})

module.exports = model('Calculator', Calculator)