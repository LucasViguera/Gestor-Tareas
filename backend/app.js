import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js"; // Rutas de autenticación
import taskRoutes from "./src/routes/task.routes.js"; // Rutas de tareas
import userRoutes from "./src/routes/user.routes.js"; 
import "./src/database/db.js"; 

dotenv.config();
const app = express();
const port = process.env.PORT || 3000

// Configuración de CORS
app.use(cors({
  origin: "https://gestor-tareas-rust.vercel.app", 
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(cors);


// Middleware para manejar datos JSON
app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutes); // Prefijo '/auth' para las rutas de autenticación
// Rutas de tareas
app.use("/tasks", taskRoutes); // Prefijo '/tasks' para las rutas de tareas

app.use("/users", userRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
