//validation
const Joi = require('joi');
const { schema } = require('./model/User');

const registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
        email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .required(),
        password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
    });
    return schema.validate(data, {abortEarly: false});
}

const loginValidation = data =>{
    const schema = {
        email: Joi.string()
        .min(6)
        .required()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
            .required(),
        password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) 
        .required()   
        })
    }
    return schema.validate(data, {abortEarly: false});
}
module.exports.registerValidation = registerValidation;