import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();


router.get('/', taskController.getTasks);  

router.post('/create', taskController.createTask);  

router.delete('/delete/:id', taskController.deleteTask);


export default router;
