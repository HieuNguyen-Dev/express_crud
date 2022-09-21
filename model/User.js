const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        max:255,
        min:6
    },
    password:{
        type: String,
        required: true,
        max:255,
        min:6
    },
    role:{
        type: String,
        required: true,
        default: 'Student'
    },
    avatar:{
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('User', userSchema);