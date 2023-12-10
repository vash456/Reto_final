const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const validatePost = require('../middlewares/postsValidation')
const isAuthenticated = require('../middlewares/authValidation')

// Unprotected endpoints
router.get('/:id', postController.getPost)
router.get('/all', postController.getPosts)

// Controller or router level middleware
// router.use(isAuthenticated)

// Unprotected endpoints
router.post('/', validatePost, postController.createPost);
router.get('/user/:id', postController.getPostsUser)
router.patch('/:id', validatePost, postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router