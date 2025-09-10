import prisma from '../../prisma/prismaClient.js';
import { handleError } from '../utils/errorhandler.js';

export const getTasks = async (req, res) => {
  try {
    const { role, userId } = req.user;
    // Si es ADMIN, obtiene todas las tareas
    // Si es USER, solo las tareas asignadas a él
    const whereClause =
      role === 'ADMIN'
        ? {} // todas
        : { assignments: { some: { userId } } }; // solo las asignadas al user

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: { id: 'desc' },
      include: { assignments: { include: { user: { select: { id: true, username: true } } } } }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    handleError(res, 'Error al obtener tareas');
  }
};

export const createTask = async (req, res) => {
  const { title, description, startDate, endDate, priority, assigneeIds = [], completed } = req.body;

  if (!title || !description || !startDate || !endDate || !priority) {
    return handleError(res, 'Todos los campos son obligatorios', 400);
  }

  const s = new Date(startDate);
  const e = new Date(endDate);
  if (isNaN(s.getTime())) return handleError(res, 'Fecha de inicio no válida', 400);
  if (isNaN(e.getTime())) return handleError(res, 'Fecha de finalización no válida', 400);
  if (s > e) return handleError(res, 'La fecha de inicio no puede ser posterior a la fecha de finalización', 400);

  const ids = Array.isArray(assigneeIds)
    ? assigneeIds.map(n => parseInt(n, 10)).filter(n => Number.isInteger(n) && n > 0)
    : [];
  if (ids.length === 0) return handleError(res, 'Debes indicar al menos un usuario asignado', 400);

  const done = (completed === 1 || completed === '1' || completed === true || completed === 'true') ? 1 : 0;

  try {
    const created = await prisma.task.create({
      data: {
        title,
        description,
        startDate: s,
        endDate: e,
        priority,
        completed: done,
        assignments: { create: ids.map(userId => ({ userId })) }
      },
      select: { id: true }
    });

    res.status(201).json({ message: 'Tarea creada con éxito', id: created.id });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    handleError(res, 'Error al crear la tarea');
  }
};

export const updateTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { completed } = req.body;
  const { role, userId } = req.user;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { assignments: true },
    });
    if (!task) return handleError(res, 'Tarea no encontrada', 404);

    if (role !== 'ADMIN') {
      const isAssigned = task.assignments.some(a => a.userId === userId);
      if (!isAssigned) {
        return handleError(res, 'No puedes modificar una tarea que no te pertenece', 403);
      }
    }

    const newCompleted = (completed === 1 || completed === '1' || completed === true || completed === 'true') ? 1 : 0;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed: newCompleted },
    });

    res.status(200).json({ message: 'Tarea actualizada con éxito', task: updatedTask });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    handleError(res, 'Error al actualizar la tarea');
  }
};

export const deleteTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return handleError(res, 'Tarea no encontrada', 404);

    await prisma.task.delete({ where: { id } }); // cascada elimina asignaciones
    res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    handleError(res, 'Error al eliminar la tarea');
  }
};
