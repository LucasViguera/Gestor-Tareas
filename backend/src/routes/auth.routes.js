import express from 'express';
import { registerUser, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);  // Ruta para registrar un usuario
router.post('/login', login);            // Ruta para iniciar sesión

export default router;
