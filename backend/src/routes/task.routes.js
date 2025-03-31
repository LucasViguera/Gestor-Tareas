import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// Definimos las rutas y las conectamos con las funciones del controller
router.get('/', taskController.getTasks);  // Obtener todas las tareas
router.get('/:id', taskController.getTaskById);  // Obtener tarea por ID
router.post('/create', taskController.createTask);  // Crear tarea
router.put('/update/:id', taskController.updateTask);  // Actualizar tarea
router.delete('/delete/:id', taskController.deleteTask);  // Eliminar tarea


export default router;
