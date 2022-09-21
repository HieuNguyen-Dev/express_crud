const router = require('express').Router();
const User = require('../model/User');
const Subject = require('../model/Subject');
const Class = require('../model/Class');
const Auth = require('../model/Auth');
const bcryp = require('bcryptjs');
var crypto = require("crypto");
const multer = require('multer');


module.exports = {
    updatePassword: async (req, res) => {
        const token = req.header('auth-token');
        const salt = await bcryp.genSalt(10);
        const newPass = await bcryp.hash(req.body.newPass, salt);
        const auth = await Auth.findOne({ token: token }).populate('user');
        const user = await User.findOneAndUpdate({ _id: auth.user._id }, { password: newPass });
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
        const userEmail = req.param('userEmail');

        const user = await User.findOneAndUpdate({ email: userEmail }, { password: newPass });
        try {
            res.send("New Password: " + randomString);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    uploadAvatar: async (req, res) => {
        const token = req.header('auth-token');
        const auth = await Auth.findOne({ token: token }).populate('user');
        
        try {
            const newAvatar = req.file.path;
            const user = await User.findOneAndUpdate({ _id: auth.user._id }, { avatar: newAvatar });
            res.send("Avt is updated!");
        } catch (error) {
            res.status(500).send("No Image Found");
        }
    },
    updateClass: async (req, res) => {
        const name = req.param('className');
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const subjectName = req.body.subjectName;
        const teacherId = req.body.teacherId

        const nameExist = await Class.findOne({ name: name });
        if (!nameExist) return res.status(400).send("Class not found");

        const subject = await Subject.findOne({ name: subjectName });
        if (!subject) return res.status(400).send("Subject not found");

        const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });
        if (!teacher) return res.status(400).send("Teacher Id not correct or this user is not teacher");

        try {
            await Class.findOneAndUpdate({ name: name }, { subject: subjectName, teacher: teacher.name, startDate: startDate, endDate: endDate })
            res.send("Class is updated");
        }
        catch (errors) {
            res.status(400).send(errors.message);
        }

    }
}
