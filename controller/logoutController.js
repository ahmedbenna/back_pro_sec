
const { ObjectId } = require('mongodb');
const dbConn = require('../config/dbConn');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    const refreshToken = cookies.jwt;

    const users = await dbConn.getDB().collection('token').find().toArray();
    const foundUser = users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(204).json({'mess':'sds'});
    }

    var id = new ObjectId(foundUser._id);
    await dbConn.getDB().collection('token').deleteOne({ _id: id });

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }