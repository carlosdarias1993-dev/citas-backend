const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN INTENTO:", email);

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ error: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, usuario.password);

    if (!valid) {
      console.log("Password incorrecto");
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("LOGIN OK");

    res.json({
      token,
      rol: usuario.rol
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error); // 🔥 CLAVE
    res.status(500).json({ error: "Error en login" });
  }
};