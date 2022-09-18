const jwt = require('jsonwebtoken');
const User = require('../model/User');
const jwt_decode = require('jwt-decode');

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
    isAdmin(req, res, next) {
        const token = req.header('auth-token');
        if (!token) return res.status(401).send('Not token found')
        try {
            decoded = jwt_decode(token, process.env.TOKEN_SECET);   //DECODE TOKEN    
            if (decoded.role == "Admin") {
                next();
            } else {
                res.send("Access Denied")
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    },
    isTeacher(req, res, next) {
        const token = req.header('auth-token');
        if (!token) return res.status(401).send('Not token found')
        try {
            decoded = jwt_decode(token, process.env.TOKEN_SECET);
            if (decoded.role == "Admin" || decoded.role == "Teacher") {
                next();
            } else {
                res.send("Access Denied")
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    },
    isStudent(req, res, next) {
        const token = req.header('auth-token');
        if (!token) return res.status(401).send('Not token found')
        try {
            decoded = jwt_decode(token, process.env.TOKEN_SECET);
            if (decoded.role == "Admin" || decoded.role == "Teacher" || decoded.role == "Student") {
                next();
            } else {
                res.send("Access Denied")
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    }
}