const commentService = require('../services/comment');

const createComment = async (req, res) => {
    try {
        const { name, comment, email, status, post_id } = req.body;
        const commentResult = await commentService.saveNewComment(name, comment, email, status, post_id);
        res.status(201).send('Comment added successfully')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComment = async (req, res) => {
    try {
        const commentId = req.params.id
        const comment = await commentService.getComment(commentId);
        if (!comment) {
            res.status(404).send('Comment not found')
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await commentService.getComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCommentsPost = async (req, res) => {
    try {
        const postId = req.params.id
        const comments = await commentService.getCommentsPost(postId);
        if (!comments) {
            res.status(404).send('Comments by user not found')
        }
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { name, comment, email, status, post_id } = req.body;
        const commentResult = await commentService.updateComment(req.params.id, name, comment, email, status, post_id);
        res.status(201).send('Comment updated successfully')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        await commentService.deleteComment(commentId)
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    } 
};

module.exports = {
    createComment,
    getComment,
    getComments,
    getCommentsPost,
    updateComment,
    deleteComment
};