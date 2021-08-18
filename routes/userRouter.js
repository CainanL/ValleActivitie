const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register-user', userController.registerUser);
router.post('/register-admin', userController.registerAdmin);
router.post('/edit-user', userController.editUser);
router.delete('/delete-user', userController.deletUser);

module.exports = router;