const router = require('express').Router();
const User = require('../model/User');
const Joi = require('@hapi/joi');
const bcryp = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerValidate = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
const loginValidate = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

module.exports = {
    // ---------------REGISTER----------------------
    register: async (req, res) => {
        // validate data before add a user
        const { error } = registerValidate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check email is existed
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send("Email is existed");

        //Hash password
        const salt = await bcryp.genSalt(10); //độ phức tap của hàm băm
        const hashedPassword = await bcryp.hash(req.body.password, salt);

        // creat a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    },
    // ---------------LOGIN----------------------
    login: async (req, res) => {
        // validate data before check email & password
        const { error } = loginValidate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email is not found");
        // check password
        const password = await bcryp.compare(req.body.password, user.password);
        if (!password) return res.status(400).send("Password not correct");

        // create and assign token
        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.TOKEN_SECET, { expiresIn: "1h" });
        res.header('auth-token', token)

        res.send("Login success")
    }
}






