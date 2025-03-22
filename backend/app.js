import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js"; // Rutas de autenticación
import taskRoutes from "./src/routes/task.routes.js"; // Rutas de tareas


dotenv.config();
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',  // Cambia esto si tu frontend está en otro puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Middleware para manejar datos JSON
app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutes); // Prefijo '/auth' para las rutas de autenticación

// Rutas de tareas
app.use("/tasks", taskRoutes); // Prefijo '/tasks' para las rutas de tareas

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
