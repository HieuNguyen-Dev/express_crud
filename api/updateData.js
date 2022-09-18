const router = require('express').Router();
const User = require('../model/User');
const verify = require('./checkPermission');
const bcryp = require('bcryptjs');
var crypto = require("crypto");


module.exports = {
    updatePassword: async (req, res) => {
        const salt = await bcryp.genSalt(10);
        const newPass = await bcryp.hash(req.body.newPass, salt);

        const user = await User.findOneAndUpdate({ _id: decoded._id }, { password: newPass });
        try {
            res.send("Password is updated!");
        } catch (error) {
            res.status(500).send(error);
        }
    },
    resetPassword: async (req, res) => {
        const salt = await bcryp.genSalt(10);
        const randomString = crypto.randomBytes(6).toString('hex');
        const newPass = await bcryp.hash(randomString, salt);
        const userEmail = req.param('userEmail')

        const user = await User.findOneAndUpdate({ email: userEmail }, { password: newPass });
        try {
            res.send("New Password: " + randomString);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
