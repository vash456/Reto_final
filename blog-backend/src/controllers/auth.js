const userService = require('../services/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.login(username, password);
        const token = jwt.sign({ id: user.id, username: user.username, kind: user.kind }, process.env.JWT_KEY)
        res.status(201).json({ success: true, token });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Datos incorrectas' });
    }
};

const logout = async (req, res) => {
    // req.session.destroy(err => {
    //     if (err) {
    //         return res.status(500).send('Unable to log out')
    //     }
    //     res.send('Logout successful');
    // })
};

module.exports = {
    login,
    logout
};