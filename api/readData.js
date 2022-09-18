const router = require('express').Router();
const User = require('../model/User');
const verify = require('./checkPermission');

module.exports = {
  // Get All User
  allUser: async (req, res) => {

    const users = await User.find({}, { password: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Get Student List 
  listStudent: async (req, res) => {
    const users = await User.find({ role: "Student" }, { password: 0, role: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Find Student By Name
  findStdByName: async (req, res) => {
    const name = req.param('studentName')
    const users = await User.find({ role: "Student", name: { $regex: '.*' + name + '.*' } }, { password: 0, role: 0 });
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

  // Find Student By Email
  findStdByEmail: async (req, res) => {
    const email = req.param('studentEmail')
    const users = await User.find({ role: "Student", email: { $regex: '.*' + email + '.*' } }, { password: 0, role: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Find User By Name
  findUserByName: async (req, res) => {
    const name = req.param('userName')
    const users = await User.find({ name: { $regex: '.*' + name + '.*' } }, { password: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Find User By Email
  findUserByEmail: async (req, res) => {
    const email = req.param('userEmail')
    const users = await User.find({ email: { $regex: '.*' + email + '.*' } }, { password: 0 });
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}







