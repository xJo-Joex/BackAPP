const authService = require('../services/authService');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const token = await authService.register(username, email, password);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login };
