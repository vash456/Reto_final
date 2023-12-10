const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const validatePost = require('../middlewares/postsValidation')
const isAuthenticated = require('../middlewares/authValidation')

// Controller or router level middleware
router.use(isAuthenticated)

// Unprotected endpoints
router.post('/', validatePost, postController.createPost);

// Protected endpoints 
router.get('/all', postController.getPosts)
router.get('/user/:id', postController.getPostsUser)
router.get('/:id', postController.getPost)
router.patch('/:id', validatePost, postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router