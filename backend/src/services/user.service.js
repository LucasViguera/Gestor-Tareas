import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// Función para crear un nuevo usuario
async function createUser(req, res) {
  const { email, password, name } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Crear el nuevo usuario
  const newUser = await prisma.user.create({
    data: {
      email,
      password,  // Asume que ya has hasheado la contraseña antes de almacenarla
      name,
    },
  });

  res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
}

// Función para iniciar sesión
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Buscar al usuario por su correo
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || user.password !== password) {  // Asegúrate de comparar la contraseña hasheada
    return res.status(400).json({ message: 'Credenciales inválidas' });
  }

  // Crear un token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Inicio de sesión exitoso', token });
}

// Función para obtener todos los usuarios
async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json({ users });
}

// Función para obtener los datos del usuario autenticado
async function getUserData(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,  // Usamos el ID del usuario del token JWT
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({ user });
}

export { createUser, loginUser, getAllUsers, getUserData };
