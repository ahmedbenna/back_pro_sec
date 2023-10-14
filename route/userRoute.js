const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const userController = require('../controller/userController');

router.get('/curent',verifyJWT, userController.getCurentUser);
router.get('/',verifyJWT, userController.getAllUsers);
router.get('/:id',verifyJWT, userController.getUserById);
router.get('/find/:user',verifyJWT, userController.find);
router.put('/:id',verifyJWT, userController.updateUser);
router.delete('/:id', verifyJWT,userController.deleteUser);

module.exports = router;
