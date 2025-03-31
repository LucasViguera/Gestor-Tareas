// src/routes/user.routes.js

import express from 'express';
import { getUsers, deleteUser } from '../controllers/userController.js'; // Importa los controladores
import  authenticateToken  from '../middlewares/auth.middleware.js'; // Middleware para la autenticación de token

const router = express.Router();

// Ruta para obtener todos los usuarios (requiere autenticación)
router.get('/', authenticateToken, getUsers);

// Ruta para eliminar un usuario por ID (requiere autenticación y rol admin)
router.delete('/delete/:id', authenticateToken, deleteUser);

export default router;
