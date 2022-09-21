const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Auth = require('../model/Auth');

// module.exports = function (req, res, next){
//     const token = req.header('auth-token');
//     if(!token) return res.status(401).send('Access Denied')
//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).send('Invalid Token')
//     }
// }
module.exports = {
    isAdmin: async (req, res, next) => {
        const token = req.header('auth-token');
        const auth = await Auth.findOne({ token: token }).populate('user');
        if (!token) return res.status(401).send('Not token found')
        try {
            if (auth.user.role == "Admin") {
                next();
            } else {
                res.send("Access Denied")
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    },
    isTeacher: async (req, res, next) => {
        const token = req.header('auth-token');
        const auth = await Auth.findOne({ token: token }).populate('user');
        if (!token) return res.status(401).send('Not token found')
        try {
            if (auth.user.role == "Teacher" || auth.user.role == "Admin") {
                next();
            } else {
                res.send("Access Denied")
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    },
    isStudent: async (req, res, next) => {
        const token = req.header('auth-token');
        const auth = await Auth.findOne({ token: token }).populate('user');
        if (!token) return res.status(401).send('Not token found')
        try {
            if (auth.user.role == "Teacher" || auth.user.role == "Admin" ||  auth.user.role == "Student" ) {
                next();
            } else {
                res.send("Access Denied")
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    }
}