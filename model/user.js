const Joi = require('joi');

let userSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(10000000).max(99999999).required(),
    email: Joi.string().email().required(),
    job : Joi.string().required(),
    grade: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).min(8).max(30).required(),
    role: Joi.string().valid('client', 'admin').required(),
});

function validateUser(obj) {
    let valid_res = userSchema.validate(obj);

    return valid_res.error

}

module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
