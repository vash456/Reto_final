const { Model, DataTypes } = require('sequelize')

const POST_TABLE = 'POSTS'

//const sequelize = require('../sequelize');

const PostSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    brief: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 511]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 511]
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

class Post extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: POST_TABLE,
            modelName: 'Posts',
            timestamps: false
        }
    }
}

module.exports = { POST_TABLE, PostSchema, Post }