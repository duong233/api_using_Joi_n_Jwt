const Joi = require('joi-plus');

const userSchema = Joi.object().keys({
    username: Joi.string().email({
        minDomainSegments: 2,
        tlds:{allow:['net','com']}
    })
    .required(),
    password: Joi.string()
    .password({
        min: 6,
        max: 20,
        uppercase: true,
        lowercase: true,
        number: true
    })
    .required(),
    confirmPassword: Joi.string().match('password').required(),
    name: Joi.string().min(3).max(20).required()
});

const updatedSchema = Joi.object().keys({
    name: Joi.string().min(3).max(20).required()
});

module.exports = {userSchema, updatedSchema};