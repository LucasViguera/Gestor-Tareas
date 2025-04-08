import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js"; 
import userRoutes from "./src/routes/user.routes.js"; 
import "./src/database/db.js"; 

dotenv.config();
const app = express();
const port = process.env.PORT || 3000

app.use(cors({
  origin: "https://gestor-tareas-rust.vercel.app", 
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

app.use("/auth", authRoutes); 
app.use("/tasks", taskRoutes); 
app.use("/users", userRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
