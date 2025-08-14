// src/controllers/userController.js
import prisma from "../../prisma/prismaClient.js";
import { handleError } from "../utils/errorhandler.js";

/**
 * GET /users
 * Devuelve usuarios con tareas aplanadas (assignments -> tasks[])
 * Esto permite que el front consuma user.tasks directamente.
 */
export const getUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        assignments: {
          include: {
            task: true, // cada assignment trae su task
          },
        },
      },
      orderBy: { id: "asc" },
    });

    // Aplanar: assignments -> tasks[]
    const result = users.map((u) => ({
      id: u.id,
      email: u.email,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      tasks: u.assignments.map((a) => a.task),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    handleError(res, "Error al obtener los usuarios");
  }
};

/**
 * DELETE /users/delete/:id
 * Solo ADMIN puede eliminar usuarios.
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo permitir a los administradores eliminar usuarios
    if (req.user?.role !== "ADMIN") {
      return handleError(
        res,
        "Acción no permitida. Se requiere privilegios de administrador.",
        403
      );
    }

    const userId = parseInt(id, 10);
    if (Number.isNaN(userId)) {
      return handleError(res, "ID de usuario inválido.", 400);
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return handleError(res, "Usuario no encontrado", 404);

    // Eliminar el usuario (si tenés FK, asegurate de ON DELETE CASCADE en assignments)
    await prisma.user.delete({ where: { id: userId } });

    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    handleError(res, "Error al eliminar el usuario");
  }
};
