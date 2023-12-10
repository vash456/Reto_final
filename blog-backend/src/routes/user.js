const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validateUser = require('../middlewares/usersValidation')
const isAuthenticated = require('../middlewares/authValidation')

// Unprotected endpoints
router.post('/', validateUser, userController.createUser);

// Controller or router level middleware
router.use(isAuthenticated)

// Protected endpoints 
router.get('/all', userController.getUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', validateUser, userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router