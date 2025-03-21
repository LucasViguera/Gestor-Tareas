import { getUserData, getAllUsers } from '../services/user.service.js';
import { handleError } from '../utils/errorHandler.js';

// Función para obtener los datos del usuario autenticado
async function getUser(req, res) {
  try {
    await getUserData(req, res);
  } catch (error) {
    handleError(res, 'Error al obtener los datos del usuario');
  }
}

// Función para obtener todos los usuarios
async function getAll(req, res) {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    handleError(res, 'Error al obtener todos los usuarios');
  }
}

export { getUser, getAll };
