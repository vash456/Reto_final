const postService = require('../services/post');

const createPost = async (req, res) => {
    try {
        const { title, brief, content, image, status, user_id } = req.body;
        const post = await postService.saveNewPost(title, brief, content, image, status, user_id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await postService.getPost(postId);
        if (!post) {
            res.status(404).send('Post not found')
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await postService.getPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { title, brief, content, image, status, user_id } = req.body;
        const post = await postService.updatePost(req.params.id, title, brief, content, image, status, user_id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        await postService.deletePost(postId)
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    } 
};

module.exports = {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
};