const mongoose = require('mongoose')


const classSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 2,
        max: 255,
        unique: true
    },
    subject:{
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    teacher:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    startDate:{
        type: Date,
        default: Date.now
    },
    endDate:{
        type: Date,
    }
})

module.exports = mongoose.model('Class', classSchema);