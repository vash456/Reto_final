const { models } = require('../db/sequelize')

async function getComments() {
    const comments = await models.Comments.findAll();
    return comments
}

async function getComment(commentId) {
    const comment = await models.Comments.findByPk(commentId)
    return comment
}

async function getCommentsPost(postId) {
    const comments = await models.Comments.findAll({
        where: {
          post_id: postId
        }
      })
    return comments
}

async function saveNewComment(name, comment, email, status, post_id) {
    const commentCreated = await models.Comments.create({
        name: name,
        comment: comment,
        email: email,
        post_id: post_id,
        status: status
    })
    console.log(commentCreated)
}

async function updateComment(commentId, name, comment, email, status, post_id) {
    const commentResult = await models.Comments.findByPk(commentId)
    if (!commentResult) {
        throw new Error("Comment not found")
    }
    await commentResult.update({
        name: name,
        comment: comment,
        email: email,
        post_id: post_id,
        status: status
    })
}

async function deleteComment(commentId) {
    const commentToDelete = await models.Comments.findByPk(commentId)
    commentToDelete.destroy()
}

module.exports = {
    getComment,
    getComments,
    getCommentsPost,
    deleteComment,
    updateComment,
    saveNewComment
}