import prisma from "../../prisma/prismaClient.js";
import { handleError } from "../utils/errorhandler.js";
import * as userService from '../services/user.service.js';

export const createUser = userService.createUser;
export const loginUser = userService.loginUser;
export const getUserData = userService.getUserData;
export const getUsers = userService.getAllUsers;

// Middleware para verificar rol de administrador
export async function checkAdmin(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });

    if (!user || user.role !== "ADMIN") {
      return handleError(res, "Acceso denegado. Se requiere rol de administrador.", 403);
    }

    next();
  } catch (error) {
    handleError(res, "Error al verificar el rol del usuario");
  }
}
