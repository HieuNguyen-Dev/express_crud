const Joi = require('@hapi/joi');

const registerValidate = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
const loginValidate = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
const updateInfoValidate = Joi.object({
    name: Joi.string().min(6).max(255),
    address: Joi.string().min(6).max(255),
});

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;