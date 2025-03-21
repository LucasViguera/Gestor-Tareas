import { Router } from 'express';
const router = Router();
import { createUser, loginUser, getUserData } from '../controllers/authController.js';  // Usamos los controladores del archivo authController.js
import authenticateToken from '../middleware/authenticateToken.js';  // Importamos el middleware de autenticación

// Ruta para crear un usuario
router.post('/register', createUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta protegida para obtener los datos del usuario autenticado
router.get('/user', authenticateToken, getUserData);  // Usamos el middleware de autenticación

export default router;
