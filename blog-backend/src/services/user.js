const { models } = require('../db/sequelize')
const bcrypt = require('bcrypt');

async function login(username, password) {
    try {
        const user = await models.Users.findOne({
            where: {
                username,
            }
        });
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!user || !passwordMatch) {
            throw new Error('Wrong username or password')
        }
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getUsers() {
    const users = await models.Users.findAll();
    return users
}

async function getUser(userId) {
    const user = await models.Users.findByPk(userId)
    return user
}

async function getUsername(userId) {
    const user = await models.Users.findByPk(userId)
    return {username: user.username}
}

async function saveNewUser(name, lastname, username, email, password, image) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userCreated = await models.Users.create({
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: hashedPassword,
        image: image
    })
    console.log(userCreated)
}

async function updateUser(userId, name, lastname, username, email, password, image) {
    const user = await models.Users.findByPk(userId)
    if (!user) {
        throw new Error("User not found")
    }
    await user.update({
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        image: image
    })
}

async function deleteUser(userId) {
    const userToDelete = await models.Users.findByPk(userId)
    userToDelete.destroy()
}

module.exports = {
    login,
    getUser,
    getUsername,
    getUsers,
    deleteUser,
    updateUser,
    saveNewUser
}