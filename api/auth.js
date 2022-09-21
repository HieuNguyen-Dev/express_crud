const router = require('express').Router();
const User = require('../model/User');
const Auth = require('../model/Auth');
const Joi = require('@hapi/joi');
const bcryp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('../validation');

module.exports = {
    // ---------------REGISTER----------------------
    register: async (req, res) => {
        // validate data before add a user
        const { error } = validation.registerValidate.validate(req.body);
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
        const { error } = validation.loginValidate.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email is not found");
        // check password
        const password = await bcryp.compare(req.body.password, user.password);
        if (!password) return res.status(400).send("Password not correct");

        // create and assign token     
        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.TOKEN_SECET, { expiresIn: "1h" });

        const auth = await Auth.findOne({ user: user._id });
        try {
            if (!auth) {
                const auth = new Auth({
                    token: token,
                    user: user._id
                });
                    const savedAuth = await auth.save();
                    res.send(savedAuth);
            } else {
                const savedAuth = await Auth.findOneAndUpdate(({ user: auth.user }, { token: token }));
                const newAuth = await Auth.findOne({ user: user._id });
                res.header('auth-token', newAuth.token);
                res.send("Login Succes");
            }
        } catch (error) {
            res.status(500).send(error);
        }

    }
}






