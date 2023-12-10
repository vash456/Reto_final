const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const validateComment = require('../middlewares/commentsValidation');
const isAuthenticated = require('../middlewares/authValidation')
const authorize = require('../middlewares/userRoleValidation');

// Unprotected endpoints
router.post('/', validateComment, commentController.createComment);
router.get('/all', commentController.getComments)
router.get('/post/:id', commentController.getCommentsPost)

// Controller or router level middleware
router.use(isAuthenticated)

// Protected endpoints 
router.get('/:id', commentController.getComment)
router.patch('/:userId/:id', validateComment, authorize(), commentController.updateComment)
router.delete('/:userId/:id', authorize(2), commentController.deleteComment)

module.exports = router