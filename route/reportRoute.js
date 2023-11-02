const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const reportController = require('../controller/reportController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/user', verifyJWT, reportController.getAllUserReport)
router.post('/', verifyJWT, reportController.addReport);
router.get('/', verifyJWT, verifyAdmin, reportController.getAllReport)
router.get('/:id', verifyJWT, verifyAdmin, reportController.getReportById);
router.get('/find/:report', verifyJWT, verifyAdmin, reportController.find);
router.put('/:id', verifyJWT, verifyAdmin, reportController.updateReport);
router.delete('/:id', verifyJWT, verifyAdmin, reportController.deleteReport);

module.exports = router;
