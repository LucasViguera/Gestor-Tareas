import { Router } from "express";
import * as authController from "../controllers/authController.js";
import  authenticateToken from "../middlewares/auth.middleware.js"; 

const router = Router();


router.get("/users", authenticateToken, authController.getUsers);

router.post("/register", authController.createUser); 

router.post("/login", authController.loginUser); 

router.get("/user", authenticateToken, authController.getUserData);

router.get("/admin", authenticateToken, authController.checkAdmin, (_req, res) => {
  res.status(200).json({ message: "Acceso autorizado como administrador" });
});

export default router;
