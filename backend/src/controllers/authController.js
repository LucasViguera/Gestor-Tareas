import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import bcrypt from 'bcrypt';  // Para encriptar contraseñas
import jwt from 'jsonwebtoken';

// Función para crear un nuevo usuario
async function createUser(req, res) {
  const { email, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Asignar un rol por defecto (si no se especifica uno)
    const userRole = role || 'USER';  // Si no se pasa un rol, por defecto será 'USER'

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: userRole,  // Asignar el rol durante la creación del usuario
      },
    });

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token
    res.status(201).json({ message: 'Usuario creado con éxito', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

// Función para iniciar sesión
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT con el rol
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

// Función para obtener los datos del usuario autenticado
async function getUserData(req, res) {
  const { userId } = req.user;  // `req.user` contiene la información decodificada del token

  try {
    // Buscar al usuario en la base de datos utilizando el userId
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Responder con los datos del usuario
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
}

// Función para verificar si el usuario tiene el rol de admin (opcional)
async function checkAdmin(req, res, next) {
  const { userId } = req.user;  // Obtener el userId desde el token

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
    }

    next();  // Si el usuario es admin, continuamos con la siguiente función
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el rol del usuario' });
  }
}

export { createUser, loginUser, getUserData, checkAdmin };
