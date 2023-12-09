const { models } = require('../db/sequelize')

async function getPosts() {
    const posts = await models.Posts.findAll();
    return posts
}

async function getPost(postId) {
    const post = await models.Posts.findByPk(postId)
    return post
}

async function getPostsUser(userId) {
    const posts = await models.Posts.findAll({
        where: {
          user_id: userId
        }
      })
    return posts
}

async function saveNewPost(title, brief, content, image, status, user_id) {
    const postCreated = await models.Posts.create({
        title: title,
        brief: brief,
        content: content,
        image: image,
        status: status,
        user_id: user_id,
    })
    console.log(postCreated)
}

async function updatePost(postId, title, brief, content, image, status, user_id) {
    const post = await models.Posts.findByPk(postId)
    if (!post) {
        throw new Error("Post not found")
    }
    await post.update({
        title: title,
        brief: brief,
        content: content,
        image: image,
        status: status,
        user_id: user_id,
    })
}

async function deletePost(postId) {
    const postToDelete = await models.Posts.findByPk(postId)
    postToDelete.destroy()
}

module.exports = {
    getPost,
    getPosts,
    getPostsUser,
    deletePost,
    updatePost,
    saveNewPost
}