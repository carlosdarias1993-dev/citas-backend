const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    const verificado = jwt.verify(token, "secreto123");
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};