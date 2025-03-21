import express from 'express';
const app = express();
import cors from 'cors';
import pkg from 'body-parser';
import authRoutes from './src/routes/authRoutes.js';  // Rutas de autenticación

const { json } = pkg;

// Middleware
app.use(cors());
app.use(json());  // Para poder recibir datos JSON

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
