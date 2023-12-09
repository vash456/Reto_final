const userService = require('../services/user');

const createUser = async (req, res) => {
    try {
        const { name, lastname, username, email, password, image } = req.body;
        const user = await userService.saveNewUser(name, lastname, username, email, password, image);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userService.getUser(userId);
        if (!user) {
            res.status(404).send('User not found')
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, lastname, username, email, password, image } = req.body;
        const user = await userService.updateUser(req.params.id, name, lastname, username, email, password, image);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId)
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    } 
};

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
};