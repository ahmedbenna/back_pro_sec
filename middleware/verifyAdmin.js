const { decryptUser } = require('../model/user');

require('dotenv').config();

const verifyAdmin = (req, res, next) => {
    let user= decryptUser(req.user)
    if (user.role != 'admin') {
        res.sendStatus(403)
    } else {
        next();
    }
}
module.exports = verifyAdmin
