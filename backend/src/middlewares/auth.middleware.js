import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "No se proporcionó un token" });
  }

  const token = authHeader.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
    
    req.user = user;
    next();
  });
};

export default authenticateToken;
