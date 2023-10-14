require('dotenv').config();

const verifyAdmin = (req, res, next) => {
    if (req.user.role != 'admin') {
        res.sendStatus(403)
    } else {
        next();
    }
}
module.exports = verifyAdmin
