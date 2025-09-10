import express from 'express';
import * as taskController from '../controllers/taskController.js';
import authenticateToken from '../middlewares/auth.middleware.js';
import { checkAdmin } from '../controllers/authController.js';

const router = express.Router();

router.get('/', authenticateToken, taskController.getTasks);

router.post('/create', authenticateToken, checkAdmin, taskController.createTask);

router.put('/update/:id', authenticateToken, taskController.updateTask);

router.delete('/delete/:id', authenticateToken, checkAdmin, taskController.deleteTask);

export default router;
