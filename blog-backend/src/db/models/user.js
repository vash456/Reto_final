const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'USERS'

//const sequelize = require('../sequelize');

const UserSchema = {
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
            len: [0, 50]
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 60]
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
    kind: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}

class User extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'Users',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }