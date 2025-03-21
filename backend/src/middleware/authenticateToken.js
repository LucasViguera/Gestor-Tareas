import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Obtener el token del header Authorization
  const token = req.header('Authorization')?.split(' ')[1];

  // Si no hay token, respondemos con un error de acceso no autorizado
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Si el token no es válido o ha expirado, retornamos un error
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Adjuntar la información del usuario al objeto request para que se pueda usar en el siguiente middleware
    req.user = user;

    // Llamamos al siguiente middleware o función (en este caso, el controlador)
    next();
  });
};

export default authenticateToken;
