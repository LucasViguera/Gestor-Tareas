import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js"; // Rutas de autenticación
import taskRoutes from "./src/routes/task.routes.js"; // Rutas de tareas
import UserRoutes from "./src/routes/user.routes.js";


dotenv.config();
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',  // Cambia esto si tu frontend está en otro puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


// Middleware para manejar solicitudes OPTIONS
app.options('*', (_req, res) => {
  res.status(200).end(); // Responde con un 200 OK para todas las solicitudes OPTIONS
});

// Middleware para manejar datos JSON
app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutes); // Prefijo '/auth' para las rutas de autenticación

app.use("/users", UserRoutes);
// Rutas de tareas
app.use("/tasks", taskRoutes); // Prefijo '/tasks' para las rutas de tareas

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
