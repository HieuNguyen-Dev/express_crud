const mongoose = require('mongoose');
const Class = require('./Class');
const User = require('./User');
const Schema = mongoose.Schema;



const classDetailSchema = new mongoose.Schema({
    class:{
        type: Schema.Types.ObjectId, ref: Class
    },
    student:{
        type: Schema.Types.ObjectId, ref: User
    }
})

module.exports = mongoose.model('ClassDetail', classDetailSchema);