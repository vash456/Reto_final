const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validateUser = require('../middlewares/usersValidation')

// Unprotected endpoints
router.post('/', validateUser, userController.createUser);

// Protected endpoints 
router.get('/all', userController.getUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', validateUser, userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router