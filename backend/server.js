require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Ruta de login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificar que se enviaron ambos parámetros
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    // Buscar al usuario por email en la base de datos
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar la contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, // Asegúrate de tener este secreto en tu archivo .env
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar el login", error: error.message });
  }
});


// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error: error.message });
  }
});

// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  // Validación simple
  if (!title || !description) {
    return res.status(400).json({ message: "Título y descripción son obligatorios" });
  }

  try {
    const newTask = await prisma.task.create({
      data: { title, description },
    });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error: error.message });
  }
});

// Marcar tarea como completada
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { completed: true },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
  }
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
