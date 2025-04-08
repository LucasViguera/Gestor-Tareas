import prisma from "../../prisma/prismaClient.js";

// Obtener usuarios con sus tareas
export const getUsers = async (req, res) => {
  try {
    // Verificar el token de autorización
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }

    // Verificar la validez del token
    const decoded = verifyToken(token);


    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        tasks: true, 
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error al obtener los usuarios' });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo permitir a los administradores eliminar usuarios
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acción no permitida. Se requiere privilegios de administrador.' });
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: error.message || 'Error al eliminar el usuario' });
  }
};
