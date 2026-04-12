const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si ya existe
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHash,
      rol: rol || "cliente" // por defecto cliente
    });

    await nuevoUsuario.save();

    res.json({ mensaje: "Usuario creado correctamente" });

  } catch (error) {
    console.error("ERROR REGISTER:", error);
    res.status(500).json({ error: "Error en registro" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ error: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, usuario.password);

    if (!valid) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || "secreto123",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      rol: usuario.rol
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({ error: "Error en login" });
  }
};