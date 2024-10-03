const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Ruta protegida para el usuario ${req.userId}` });
});

module.exports = router;
