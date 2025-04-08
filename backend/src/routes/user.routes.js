import express from 'express';
import { getUsers, deleteUser } from '../controllers/userController.js';
import  authenticateToken  from '../middlewares/auth.middleware.js'; 

const router = express.Router();

router.get('/', authenticateToken, getUsers);

router.delete('/delete/:id', authenticateToken, deleteUser);

export default router;
