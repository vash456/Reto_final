const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Unprotected endpoints
router.post('/', commentController.createComment);

// Protected endpoints 
router.get('/all', commentController.getComments)
router.get('/post/:id', commentController.getCommentsPost)
router.get('/:id', commentController.getComment)
router.patch('/:id', commentController.updateComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router