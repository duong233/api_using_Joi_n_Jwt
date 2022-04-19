const Joi = require('joi-plus');

const changePwSchema = Joi.object({
    newPassword: Joi.string()
    .password({
        min: 8,
        max: 120,
        lowercase: true,
        uppercase: true,
        number: true
    })
    .required(),
    confirmPassword: Joi.string().match('newPassword').required()
});

module.exports = {changePwSchema};