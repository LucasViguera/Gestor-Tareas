// src/controllers/taskController.js
import prisma from '../../prisma/prismaClient.js'; // Asegúrate de tener la exportación predeterminada de prisma configurada

// Obtener todas las tareas
export const getTasks = async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ message: 'Error al obtener tareas' });
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
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error al obtener tarea:', error);
    res.status(500).json({ message: 'Error al obtener la tarea' });
  }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
  const { title, description, startDate, endDate, priority, assigneeId, completed } = req.body;

  // Verificar que todos los campos sean proporcionados
  if (!title || !description || !startDate || !endDate || !priority || assigneeId === null) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar que assigneeId sea un número válido
  if (isNaN(assigneeId) || assigneeId <= 0) {
    return res.status(400).json({ message: 'El ID del usuario asignado es inválido' });
  }

  // Validar las fechas (startDate y endDate)
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (isNaN(parsedStartDate.getTime())) {
    return res.status(400).json({ message: 'Fecha de inicio no válida' });
  }

  if (isNaN(parsedEndDate.getTime())) {
    return res.status(400).json({ message: 'Fecha de finalización no válida' });
  }

  // Verificar que la fecha de inicio no sea posterior a la fecha de finalización
  if (parsedStartDate > parsedEndDate) {
    return res.status(400).json({ message: 'La fecha de inicio no puede ser posterior a la fecha de finalización' });
  }

  // Validar el campo 'completed' como un valor booleano representado como 0 o 1 en MySQL
  const taskCompleted = (completed === 1 || completed === "1") ? 1 : 0;

  try {
    // Crear la tarea en la base de datos utilizando Prisma
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
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, priority, assigneeId, completed } = req.body;

  try {
    // Verificar si la tarea existe
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
  
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
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
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si la tarea existe
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Eliminar la tarea
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};
