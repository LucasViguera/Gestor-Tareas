import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();


router.get('/', taskController.getTasks);  

router.get('/:id', taskController.getTaskById);

router.post('/create', taskController.createTask);  

router.put('/update/:id', taskController.updateTask); 

router.delete('/delete/:id', taskController.deleteTask);


export default router;
