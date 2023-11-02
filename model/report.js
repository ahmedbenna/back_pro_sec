const Joi = require('joi');

let reportSchema = Joi.object({
    content: Joi.string().min(3).required(),
    date: Joi.date().required(),
});

function validateReport(obj) {
    let valid_res = reportSchema.validate(obj);

    return valid_res.error

}
function encryptReport(report){
    let encryptReport = {
        _id: user._id,
        content:encrypt(String(report.content)),
        date:encrypt(String(report.date))
        
    }
    return encryptReport
}
function decryptReport(report){
    let decryptReport = {
        _id: user._id,
        content:decrypt(report.content),
        date:decrypt(report.date)
        
    }
    return decryptReport
}

module.exports.decryptReport = decryptReport;
module.exports.encryptReport = encryptReport;

module.exports.validateReport = validateReport;
module.exports.reportSchema = reportSchema;
