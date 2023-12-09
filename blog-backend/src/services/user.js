const { models } = require('../db/sequelize')

async function getUsers() {
    const users = await models.Users.findAll();
    return users
}

async function getUser(userId) {
    const user = await models.Users.findByPk(userId)
    return user
}

async function saveNewUser(name, lastname, username, email, password, image) {
    const userCreated = await models.Users.create({
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
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
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    saveNewUser
}