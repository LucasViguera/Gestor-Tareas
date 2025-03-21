import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js"; // Importamos las rutas

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);

// Servidor corriendo
app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
