import express from 'express';
import { getUser, getAll } from '../controllers/user.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';  // Middleware de autenticación

const router = express.Router();

router.get('/me', authenticateToken, getUser);    // Ruta para obtener datos del usuario autenticado
router.get('/', authenticateToken, getAll);       // Ruta para obtener todos los usuarios

export default router;
