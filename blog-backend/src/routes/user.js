const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Unprotected endpoints
router.post('/', userController.createUser);

// Protected endpoints 
router.get('/all', userController.getUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router