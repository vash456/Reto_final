const { Post, PostSchema } = require('./models/post')
const { Comment, CommentSchema } = require('./models/comment')
const { User, UserSchema } = require('./models/user')

function setupModels(sequelize) {
  Post.init(PostSchema, Post.config(sequelize))
  Comment.init(CommentSchema, Comment.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
}

module.exports = setupModels