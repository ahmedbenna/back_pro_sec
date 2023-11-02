const Joi = require('joi');
const { encrypt, decrypt } = require('../crypto/cryp');

let userSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(10000000).max(99999999).required(),
    email: Joi.string().email().required(),
    job: Joi.string().required(),
    grade: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).min(8).max(30).required(),
    role: Joi.string().valid('client', 'admin').required(),
});

function validateUser(obj) {
    let valid_res = userSchema.validate(obj);

    return valid_res.error

}

function encryptUser(user) {
    let encryptedUser = {
        _id: user._id,
        firstName: encrypt(String(user.firstName)),
        lastName: encrypt(String(user.lastName)),
        password: user.password,
        role: encrypt(String(user.role)),
        phone: encrypt(String(user.phone)),
        email: encrypt(String(user.email)),
        job: encrypt(String(user.job)),
        grade: encrypt(String(user.grade))
    }
    return encryptedUser
}
function decryptUser(user) {
    let decryptUser = {
        _id: user._id,
        firstName: decrypt(user.firstName),
        lastName: decrypt(user.lastName),
        password: user.password,
        phone: decrypt(user.phone),
        role: decrypt(user.role),
        email: decrypt(user.email),
        job: decrypt(user.job),
        grade: decrypt(user.grade)
    }
    return decryptUser
}

module.exports.encryptUser = encryptUser;
module.exports.decryptUser = decryptUser;

module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
