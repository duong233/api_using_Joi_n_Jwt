const Joi = require('joi-plus');

const taskSchema = Joi.object.key({
    name: Joi.string().min(6).max(30),
    description: Joi.string().description().min(10).max(400),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
})

module.exports = {taskSchema};