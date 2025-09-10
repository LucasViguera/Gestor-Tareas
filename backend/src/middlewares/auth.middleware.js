import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "No se proporcionó un token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: "Token inválido o expirado" });
    req.user = {
      userId: payload.userId ?? payload.id,
      role: payload.role,
      email: payload.email
    };
    next();
  });
};

export default authenticateToken;
