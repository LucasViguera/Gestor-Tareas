import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';

const app = express();

app.use(express.json());  // Middleware para parsear el cuerpo de la solicitud como JSON

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
