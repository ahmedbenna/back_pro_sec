const { ObjectId } = require('mongodb')
const dbConn = require('../config/dbConn');
const validateUser = require('../model/user')
// const reportValid = require('../model/user')
const collectionName = 'user';


async function getCurentUser(req, res) {
    const userId = req.user._id;
    var id = new ObjectId(userId);
    try {
        let user = await dbConn.getDB().collection(collectionName).findOne({ _id: id });
        user = validateUser.decryptUser(user)
        res.json(user);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await dbConn.getDB().collection(collectionName).find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getUserById(req, res) {
    const userId = req.params.id;
    var id = new ObjectId(userId);
    try {
        const user = await dbConn.getDB().collection(collectionName).findOne({ _id: id });
        res.json(user);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function find(req, res) {
    const user = String(req.params.user);
    try {
        await dbConn.getDB().collection(collectionName).createIndex({
            email: "text",
            firstName: "text",
            lastName: "text",
            phone: "text"
        })
        const userRes = await dbConn.getDB().collection(collectionName).find({ $text: { $search: user } }).toArray()
        res.json(userRes);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}


async function updateUser(req, res) {
    const userId = req.params.id;
    const updateUser = req.body;
    delete updateUser._id;
    if (validateUser.validateUser(newUser)) {
        res.status(400).json(validateUser.validateUser(newUser).message)
    } else {
        var id = new ObjectId(userId);
        try {
            await dbConn.getDB().collection(collectionName).updateOne({ _id: id }, { $set: updateUser });
            res.json({ message: 'user updated successfully' });
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }
    }
}

async function deleteUser(req, res) {
    var userId = req.params.id
    var id = new ObjectId(userId);

    try {
        await dbConn.getDB().collection(collectionName).deleteOne({ _id: id });
        res.json({ message: 'user deleted successfully' });
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

module.exports = {
    find,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getCurentUser,
};
