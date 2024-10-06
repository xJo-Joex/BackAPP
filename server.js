const express = require('express');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const connectDB = require('./config/db');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());

connectDB();
// Rutas
app.use('/api', transactionRoutes)
app.use('/api/auth', authRoutes);

// Iniciar servidor y conexión a la base de datos
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));