const mongoose = require('mongoose');
const User = require('./User');
const Subject = require('./Subject');
const Schema = mongoose.Schema;


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
        max: 255,
    },
    teacher:{
        type: Schema.Types.ObjectId, ref: User
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