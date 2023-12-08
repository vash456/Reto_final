const { Post, PostSchema } = require('./models/post')

function setupModels(sequelize) {
  Post.init(PostSchema, Post.config(sequelize))
}

module.exports = setupModels