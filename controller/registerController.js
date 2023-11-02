const dbConn = require('../config/dbConn');
const validateUser = require('../model/user')
const collectionName = 'user';
const Bcrypt = require('bcryptjs')


const addUser = async (req, res) => {
    let newUser = req.body
    newUser.role = "client"
    if (validateUser.validateUser(newUser)) {
        res.status(400).json(validateUser.validateUser(newUser).message)
    } else {
        newUser = validateUser.encryptUser(newUser)
        const users = await dbConn.getDB().collection(collectionName).find().toArray();
        const duplicateEmail = users.find(user => (user.email === newUser.email));
        if (duplicateEmail) return res.status(400).json({ message: "Email is used" });
        const duplicatePhone = users.find(user => ((user.phone === newUser.phone)));
        if (duplicatePhone) return res.status(400).json({ message: "Phone is used" });
        try {
            const hashedPwd = await Bcrypt.hashSync(newUser.password,10);
            newUser.password = hashedPwd;

            const result = await dbConn.getDB().collection(collectionName).insertOne(newUser);
            newUser = validateUser.decryptUser(newUser)

            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }
    }

}
module.exports = { addUser };
