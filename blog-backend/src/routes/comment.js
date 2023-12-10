const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const validateComment = require('../middlewares/commentsValidation');
const isAuthenticated = require('../middlewares/authValidation')

// Controller or router level middleware
router.use(isAuthenticated)

// Unprotected endpoints
router.post('/', validateComment, commentController.createComment);

// Protected endpoints 
router.get('/all', commentController.getComments)
router.get('/post/:id', commentController.getCommentsPost)
router.get('/:id', commentController.getComment)
router.patch('/:id', validateComment, commentController.updateComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router