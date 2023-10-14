const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dbConn = require('../config/dbConn');

const collectionName = 'user';

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    const users = await dbConn.getDB().collection(collectionName).find().toArray();
    const foundUser = users.find(person => person.email === email);
    if (!foundUser) return res.sendStatus(400);
    const match = await Bcrypt.compareSync(password, foundUser.password);
    if (match) {

        const accessToken = jwt.sign(
            {
                "user": foundUser
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            {
                "user": foundUser
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );
        try {
            const result = await dbConn.getDB().collection('token').insertOne({ "user": foundUser, 'refreshToken': refreshToken });
            // res.cookie('jwt', refreshToken);
            res.cookie('jwt', refreshToken).json({ token: accessToken, user: foundUser });
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }


    } else {
        res.sendStatus(400);
    }
}

module.exports = { handleLogin };
