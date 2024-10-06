const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoUri = `mongodb+srv://${process.env.DB_USER || 'admin'}:${process.env.DB_PASSWORD}@cluster0.sqhe3.mongodb.net/${process.env.DB_NAME}`
        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión a la base de datos: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
