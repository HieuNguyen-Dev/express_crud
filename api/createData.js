const Subject = require('../model/Subject');
const User = require('../model/User');
const Class = require('../model/Class');
const Class_Detail = require('../model/Class_Detail');
const Auth = require('../model/Auth');

module.exports = {
    createSubject: async (req, res) => {
        const name = req.body.name;
        const subjectExist = await Subject.findOne({ name: name });
        if (subjectExist) return res.status(400).send("Subject is existed");
        const subject = new Subject({
            name: name,
        });
        try {
            await subject.save();
            res.send("Subject is created");
        }
        catch (errors) {
            res.status(400).send(errors.message);
        }
    },
    createClass: async (req, res) => {
        const name = req.body.name;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;

        const nameExist = await Class.findOne({ name: req.body.name });
        if (nameExist) return res.status(400).send("Class name is existed, change other name");

        const subject = await Subject.findOne({ name: req.body.subjectName });
        if (!subject) return res.status(400).send("Subject not found");

        const teacher = await User.findOne({ _id: req.body.teacherId, role: "Teacher" });
        if (!teacher) return res.status(400).send("Teacher Id not correct or this user is not teacher");

        const newClass = new Class({
            name: name,
            subject: subject.name,
            teacher: teacher.id,
            startDate: startDate,
            endDate: endDate
        });
        try {
            await newClass.save();
            res.send("Class is created" + newClass);
        }
        catch (errors) {
            res.status(400).send(errors.message);
        }
    },
    registerClass: async (req, res) => {
        const token = req.header('auth-token');
        const className = req.body.className;

        const auth = await Auth.findOne({ token: token }).populate('user');
        const classExist = await Class.findOne({ name: className });

        if (auth.user.role != "Student") return res.send("You are not student");

        if (!classExist) return res.send("No Found Class");

        const isRegistered = await Class_Detail.findOne({ class: classExist._id, student: auth.user._id });
        if (isRegistered) return res.send("You registered this class before");
      
        const classDetail = new Class_Detail({
            class: classExist._id,
            student: auth.user._id
        })
        try {
            await classDetail.save();
            res.send("Register class success")
        } catch (errors) {
            res.status(400).send(errors.message);
        }
    }

}