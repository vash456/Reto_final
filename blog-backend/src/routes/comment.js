const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const validateComment = require('../middlewares/commentsValidation');
const isAuthenticated = require('../middlewares/authValidation')

// Unprotected endpoints
router.post('/', validateComment, commentController.createComment);
router.get('/all', commentController.getComments)
router.get('/post/:id', commentController.getCommentsPost)

// Controller or router level middleware
router.use(isAuthenticated)

// Protected endpoints 
router.get('/:id', commentController.getComment)
router.patch('/:id', validateComment, commentController.updateComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router