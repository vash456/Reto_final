const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

// Unprotected endpoints
router.post('/', postController.createPost);

// Protected endpoints 
router.get('/all', postController.getPosts)
router.get('/:id', postController.getPost)
router.patch('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router