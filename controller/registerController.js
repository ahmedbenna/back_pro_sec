const dbConn = require('../config/dbConn');
const validateUser = require('../model/user')
const collectionName = 'user';
const Bcrypt = require('bcryptjs')


const addUser = async (req, res) => {
    const newUser = req.body
    newUser.role = "client"
    if (validateUser.validateUser(newUser)) {
        res.status(400).json(validateUser.validateUser(newUser).message)
    } else {
        const users = await dbConn.getDB().collection(collectionName).find().toArray();
        const duplicate = users.find(user => ((user.phone === newUser.phone) || ((user.email === newUser.email) && (user.role == newUser.role))));
        if (duplicate) return res.sendStatus(400);
        try {
            const hashedPwd = await Bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPwd;
            const result = await dbConn.getDB().collection(collectionName).insertOne(newUser);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }
    }

}
module.exports = { addUser };
