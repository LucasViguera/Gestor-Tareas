import { createUser, loginUser } from '../services/user.service.js';
import { handleError } from '../utils/errorhandler.js';  // Función para manejar errores

// Función para crear un nuevo usuario
async function registerUser(req, res) {
  try {
    await createUser(req, res);  // Llama al servicio para crear el usuario
  } catch (error) {
    handleError(res, 'Error al registrar el usuario');
  }
}

// Función para iniciar sesión
async function login(req, res) {
  try {
    await loginUser(req, res);  // Llama al servicio para hacer login
  } catch (error) {
    handleError(res, 'Error al iniciar sesión');
  }
}

export { registerUser, login };
