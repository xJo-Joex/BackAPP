const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'mySecretKey';

const authMiddleware = (req, res, next) => {
    const { userId } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, secretKey);
        if(userId != decoded.userId) throw new Error('Token no valido para Usuario');
        req.userId = decoded.userId;

        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;
