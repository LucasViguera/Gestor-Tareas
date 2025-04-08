import prisma from '../../prisma/prismaClient.js';
import { handleError } from '../utils/errorhandler.js';

// Obtener todas las tareas
export const getTasks = async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    handleError(res, 'Error al obtener tareas');
  }
};

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!task) {
      return handleError(res, 'Tarea no encontrada', 404);
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error al obtener tarea:', error);
    handleError(res, 'Error al obtener la tarea');
  }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
  const { title, description, startDate, endDate, priority, assigneeId, completed } = req.body;

  if (!title || !description || !startDate || !endDate || !priority || assigneeId === null) {
    return handleError(res, 'Todos los campos son obligatorios', 400);
  }

  if (isNaN(assigneeId) || assigneeId <= 0) {
    return handleError(res, 'El ID del usuario asignado es inválido', 400);
  }

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (isNaN(parsedStartDate.getTime())) {
    return handleError(res, 'Fecha de inicio no válida', 400);
  }

  if (isNaN(parsedEndDate.getTime())) {
    return handleError(res, 'Fecha de finalización no válida', 400);
  }

  if (parsedStartDate > parsedEndDate) {
    return handleError(res, 'La fecha de inicio no puede ser posterior a la fecha de finalización', 400);
  }

  const taskCompleted = (completed === 1 || completed === "1") ? 1 : 0;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        priority,
        assigneeId,
        completed: taskCompleted
      }
    });

    res.status(201).json({ message: 'Tarea creada con éxito', id: newTask.id });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    handleError(res, 'Error al crear la tarea');
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, priority, assigneeId, completed } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return handleError(res, 'Tarea no encontrada', 404);
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        priority,
        assigneeId,
        completed: (completed === 1 || completed === "1") ? 1 : 0
      },
    });

    res.status(200).json({ message: 'Tarea actualizada con éxito', task: updatedTask });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    handleError(res, 'Error al actualizar la tarea');
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return handleError(res, 'Tarea no encontrada', 404);
    }

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    handleError(res, 'Error al eliminar la tarea');
  }
};
