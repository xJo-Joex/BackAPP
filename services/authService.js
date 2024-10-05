const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secretKey = process.env.SECRET_KEY || 'mySecretKey';  

const register = async (username, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('El correo ya está en uso');
    
    if (!isStrongPassword(password)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.');
    }
    
    const user = new User({ username, email, password });
    await user.save();
    return generateToken(user._id);
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');
    
    return generateToken(user._id);
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
};

module.exports = { register, login };
