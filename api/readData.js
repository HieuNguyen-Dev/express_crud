const router = require('express').Router();
const User = require('../model/User');
const Subject = require('../model/Subject');
const Class = require('../model/Class');
const Class_Detail = require('../model/Class_Detail.js');
const verify = require('./checkPermission');
const moment = require('moment'); // require

const perPage = 5; //amount document per page

module.exports = {
  // Get All User
  getUsers: async (req, res) => {
    let page = req.header('page');
    if (!page) page = 1;
    const users = await User
      .find({}, { password: 0 })
      .skip((perPage * page) - perPage)
      .limit(perPage)
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Get Student List 
  getStudents: async (req, res) => {
    const users = await User.find({ role: "Student" }, { password: 0, role: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Get Subject List 
  getSubjects: async (req, res) => {
    const subjects = await Subject.find();
    try {
      res.send(subjects);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Find Student By Name Or Email
  findStudent: async (req, res) => {
    const info = req.param('studentInfo');
    const users = await User.find({ role: "Student", $or: [{ name: { $regex: new RegExp(info, "i") } }, { email: { $regex: '.*' + info + '.*' } }] }, { password: 0, role: 0 });
    try {
      if (!users) {
        res.send("No record found");
      } else {
        res.send(users);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Find User By Name Or Email
  findUser: async (req, res) => {
    const info = req.param('userInfo');
    const users = await User.find({ $or: [{ name: { $regex: new RegExp(info, "i") } }, { email: { $regex: '.*' + info + '.*' } }] }, { password: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  studentInClass: async (req, res) => {
    const className = req.param('className');
    const classData = await Class.findOne({ name: className });

    const classStdents = await Class_Detail.find({ class: classData._id }).populate('student', 'name')

    const students = classStdents.map((classStudent) => {
      return classStudent.student
    })

    console.log(students, 'studentsstudentsstudentsstudents')
    console.log(classData, 'classDataclassDataclassData')
    const {_id, name, subject, teacher, startDate, endDate } = classData

    const result = {...{
      _id, 
      name, 
      subject, 
      teacher, 
      startDate: moment(startDate).format("YYYY-MM-DD"), 
      endDate : moment(endDate).format("YYYY-MM-DD")
    },...{students}}

    try {
      res.send(result);
    } catch (error) {
      res.send(error)
    }
  }

}








