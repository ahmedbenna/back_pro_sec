const { ObjectId } = require('mongodb')
const dbConn = require('../config/dbConn');
const validateReport = require('../model/report');
const { encrypt, decrypt } = require('../crypto/cryp');
const { decryptUser } = require('../model/user');
const collectionName = 'report';

async function addReport(req, res) {
    try {
        req.body.date = new Date()
        if (validateReport.validateReport(req.body)) {
            res.status(400).json(validateReport.validateReport(req.body).message)
        } else {

            report = {
                date: new Date(),
                content: req.body.content,
                user: req.user
            }
            report.content = encrypt(String(report.content))
            report.date = encrypt(String(report.date))
            const result = await dbConn.getDB().collection(collectionName).insertOne(report);
            report.content = decrypt(report.content)
            report.date = decrypt(report.date)
            report.user = decryptUser(report.user)
            res.status(201).json(report);
        }
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getAllReport(req, res) {
    try {
        const reports = await dbConn.getDB().collection(collectionName).find().toArray();

        reports.forEach((element, index) => {
            element.content = decrypt(element.content);
            element.date = decrypt(element.date)
            element.user = decryptUser(element.user)
          });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}
async function getAllUserReport(req, res) {
    let user = req.user
    try {
        const reports = await dbConn.getDB().collection(collectionName).find ({user : user}).toArray();

        reports.forEach((element, index) => {
            element.content = decrypt(element.content);
            element.date = decrypt(element.date)
            element.user = decryptUser(element.user)
          });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}
async function getReportById(req, res) {
    const reportId = req.params.id;
    var id = new ObjectId(reportId);
    try {
        const report = await dbConn.getDB().collection(collectionName).findOne({ _id: id });
        report.content = decrypt(report.content)
        report.date = decrypt(report.date)
        report.user = decryptUser(report.user)
        res.json(report);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function find(req, res) {
    const report = String(req.params.report);
    try {
        await dbConn.getDB().collection(collectionName).createIndex({
            email: "text",
            firstName: "text",
            lastName: "text",
            phone: "text"
        })
        const reportRes = await dbConn.getDB().collection(collectionName).find({ $text: { $search: report } }).toArray()
        reportRes.forEach((element, index) => {
            element.content = decrypt(element.content);
            element.date = decrypt(element.date)
            element.user = decryptUser(element.user)
          });
        res.json(reportRes);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}


async function updateReport(req, res) {
    const reportId = req.params.id;
    const updateReport = req.body;
    delete updateReport._id;
    if (validateReport.validateReport(req.body)) {
        res.status(400).json(validateReport.validateReport(req.body).message)
    } else {
        var id = new ObjectId(reportId);
        try {
            await dbConn.getDB().collection(collectionName).updateOne({ _id: id }, { $set: updateReport });
            res.json({ message: 'report updated successfully' });
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }
    }
}

async function deleteReport(req, res) {
    var reportId = req.params.id
    var id = new ObjectId(reportId);
    try {
        await dbConn.getDB().collection(collectionName).deleteOne({ _id: id });
        res.json({ message: 'report deleted successfully' });
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

module.exports = {
    getAllUserReport,
    find,
    getAllReport,
    addReport,
    getReportById,
    updateReport,
    deleteReport,
};
