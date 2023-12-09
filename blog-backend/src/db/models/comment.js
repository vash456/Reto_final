const { Model, DataTypes } = require('sequelize')

const COMMENT_TABLE = 'COMMENTS'

//const sequelize = require('../sequelize');

const CommentSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}

class Comment extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMMENT_TABLE,
            modelName: 'Comments',
            timestamps: false
        }
    }
}

module.exports = { COMMENT_TABLE, CommentSchema, Comment }