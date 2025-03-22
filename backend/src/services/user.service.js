import prisma from '../../prisma/prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleError } from '../utils/errorhandler.js';



// Crear un nuevo usuario
async function createUser(req, res) {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });

    res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
  } catch (error) {
    handleError(res, 'Error al crear el usuario');
  }
}

// Iniciar sesión
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    handleError(res, 'Error al iniciar sesión');
  }
}

// Obtener todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    handleError(res, 'Error al obtener los usuarios');
  }
}

// Obtener datos del usuario autenticado
async function getUserData(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ user });
  } catch (error) {
    handleError(res, 'Error al obtener los datos del usuario');
  }
}

export { createUser, loginUser, getAllUsers, getUserData };
