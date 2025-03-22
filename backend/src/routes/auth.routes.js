import { Router } from "express";
import * as authController from "../controllers/authController.js";
import authenticateToken from "../middlewares/auth.middleware.js"; // Importamos el middleware

const router = Router();

// Obtener todos los usuarios
router.get("/users", authenticateToken, authController.getUsers);

// Registro de usuario
router.post("/register", authController.createUser);  // Cambiado a POST

// Inicio de sesión
router.post("/login", authController.loginUser);  // Cambiado a POST

// Obtener datos del usuario autenticado
router.get("/user", authenticateToken, authController.getUserData);

// Ruta de verificación de rol de administrador (solo accesible por admins)
router.get("/admin", authenticateToken, authController.checkAdmin, (_req, res) => {
  res.status(200).json({ message: "Acceso autorizado como administrador" });
});

export default router;
