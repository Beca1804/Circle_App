function auth(req, res, next) {
  // Ejemplo simple: validar que el header Authorization exista (no genera ni verifica JWT real).
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No autorizado: falta token' });
  }
  next();
}

module.exports = auth;
