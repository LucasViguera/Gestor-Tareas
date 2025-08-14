import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // Evita 401 en preflight CORS
  if (req.method === 'OPTIONS') return next();

  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "No se proporcionó un token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: "Token inválido o expirado" });

    // 🔑 Normalizamos el payload para que el resto del código siempre tenga userId y role
    req.user = {
      userId: payload.userId ?? payload.id, // tu login firma { id, email, role }
      role: payload.role,
      email: payload.email
    };
    next();
  });
};

export default authenticateToken;
