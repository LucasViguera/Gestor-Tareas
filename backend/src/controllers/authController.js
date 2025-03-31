import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prismaClient.js";
import { handleError } from "../utils/errorhandler.js";

// Función para registrar un nuevo usuario
export async function createUser(req, res) {
  const { email, password, role, username } = req.body;

  // Validar que el username esté presente
  if (!username) {
    return res.status(400).json({ error: "El nombre de usuario es obligatorio" });
  }

  try {
    // Verificar si el email ya está en uso
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "El usuario ya existe" });

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "USER"; // Asignar el rol por defecto si no se proporciona

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: userRole,
        username, // Aquí agregamos el username
      },
    });

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Responder con éxito y el token
    res.status(201).json({ message: "Usuario creado con éxito", token });
  } catch (error) {
    handleError(res, "Error al crear el usuario", error);
  }
}


export async function getUsers(_req, res) {
  try {
    const users = await prisma.user.findMany(); // Recupera todos los usuarios desde la base de datos
    res.status(200).json(users); // Retorna la lista de usuarios en la respuesta
  } catch (error) {
    handleError(res, "Error al obtener los usuarios", error);
  }
}

// Función para iniciar sesión
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    handleError(res, "Error al iniciar sesión", error);
  }
}

// Obtener datos del usuario autenticado
export async function getUserData(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    handleError(res, "Error al obtener los datos del usuario", error);
  }
}

// Middleware para verificar rol de administrador
export async function checkAdmin(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador." });
    }
    next();
  } catch (error) {
    handleError(res, "Error al verificar el rol del usuario", error);
  }
}
