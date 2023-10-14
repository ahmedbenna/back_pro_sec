const Joi = require('joi');

let reportSchema = Joi.object({
    content: Joi.string().min(3).required(),
    date: Joi.date().required(),
});

function validateReport(obj) {
    let valid_res = reportSchema.validate(obj);

    return valid_res.error

}

module.exports.validateReport = validateReport;
module.exports.reportSchema = reportSchema;
