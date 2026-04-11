const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  const existe = await Usuario.findOne({ email });
  if (existe) {
    return res.status(400).json({ error: "Usuario ya existe" });
  }

  const hash = await bcrypt.hash(password, 10);

  const usuario = new Usuario({
    nombre,
    email,
    password: hash
  });

  await usuario.save();

  res.json({ mensaje: "Usuario creado 🔥" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ error: "Usuario no existe" });
  }

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) {
    return res.status(400).json({ error: "Password incorrecta" });
  }

  const token = jwt.sign(
    { id: usuario._id },
    "secreto123",
    { expiresIn: "1d" }
  );

  res.json({ token });
};