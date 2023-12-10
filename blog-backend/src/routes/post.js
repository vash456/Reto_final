const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const validatePost = require('../middlewares/postsValidation')
const isAuthenticated = require('../middlewares/authValidation')
const authorize = require('../middlewares/userRoleValidation');

// Unprotected endpoints
router.get('/all', postController.getPosts)
router.get('/:id', postController.getPost)

// Controller or router level middleware
router.use(isAuthenticated)

// Unprotected endpoints
router.post('/create/:userId', validatePost, authorize(), postController.createPost);
router.get('/post/:userId', postController.getPostsUser)
router.patch('/:userId/:id', validatePost, authorize(), postController.updatePost)
router.delete('/:userId/:id', authorize(2), postController.deletePost)

module.exports = router