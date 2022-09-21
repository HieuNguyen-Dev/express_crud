const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;



const authSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId, ref: User
    },

});

module.exports = mongoose.model('Auth', authSchema);