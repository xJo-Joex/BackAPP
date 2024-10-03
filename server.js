const express = require('express');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

connectDB();
// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Iniciar servidor y conexión a la base de datos
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));