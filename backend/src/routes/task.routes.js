import express from 'express';
import * as taskController from '../controllers/taskController.js';
import authenticateToken from '../middlewares/auth.middleware.js';
import { checkAdmin } from '../controllers/authController.js';

const router = express.Router();

// ADMIN ve todas, USER solo las suyas (lo resuelve el controlador)
router.get('/', authenticateToken, taskController.getTasks);

// ADMIN crea
router.post('/create', authenticateToken, checkAdmin, taskController.createTask);

// USER o ADMIN marcan "completed" (el controlador valida pertenencia)
router.put('/update/:id', authenticateToken, taskController.updateTask);

// Solo ADMIN borra
router.delete('/delete/:id', authenticateToken, checkAdmin, taskController.deleteTask);

export default router;
