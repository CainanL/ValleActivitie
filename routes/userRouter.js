const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register-user', userController.registerUser);
router.post('/edit-user', userController.editUser);
router.delete('/delete-user', userController.deletUser);
router.post('/get-name', userController.getName);
router.post('/get-list-users', userController.listUser);

module.exports = router;