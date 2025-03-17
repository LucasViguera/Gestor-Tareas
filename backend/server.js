require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const newTask = await prisma.task.create({
    data: { title, description },
  });
  res.json(newTask);
});

// Marcar tarea como completada
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { completed: true },
  });
  res.json(updatedTask);
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.json({ message: "Tarea eliminada" });
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
