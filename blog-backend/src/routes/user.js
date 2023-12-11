const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validateUser = require('../middlewares/usersValidation')
const isAuthenticated = require('../middlewares/authValidation')
const authorize = require('../middlewares/userRoleValidation');

// Unprotected endpoints
router.post('/', validateUser, userController.createUser);
router.get('/username/:userId', userController.getUsername)

// Controller or router level middleware
router.use(isAuthenticated)

// Protected endpoints 
router.get('/all', authorize(2), userController.getUsers)
router.get('/:userId', authorize(), userController.getUser)
router.patch('/:userId', validateUser, authorize(), userController.updateUser)
router.delete('/:userId', authorize(2), userController.deleteUser)

module.exports = router