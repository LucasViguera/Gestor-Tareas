import prisma from "../../prisma/prismaClient.js";
import { handleError } from "../utils/handleError.js";

// Obtener usuarios con sus tareas
export const getUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        tasks: true, 
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    handleError(res, 'Error al obtener los usuarios');
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo permitir a los administradores eliminar usuarios
    if (req.user.role !== 'ADMIN') {
      return handleError(res, 'Acción no permitida. Se requiere privilegios de administrador.', 403);
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return handleError(res, 'Usuario no encontrado', 404);
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    handleError(res, 'Error al eliminar el usuario');
  }
};
