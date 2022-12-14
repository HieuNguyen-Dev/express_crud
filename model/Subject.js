const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

module.exports = mongoose.model('Subject', subjectSchema);