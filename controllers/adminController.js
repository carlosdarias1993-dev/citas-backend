const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

// CREAR BARBERO
exports.crearBarbero = async (req, res) => {
  try {
    // 🔐 SOLO BARBERO PUEDE CREAR
    if (req.usuario.rol !== "barbero") {
      return res.status(403).json({ error: "No autorizado" });
    }

    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({ email });

    if (existe) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevo = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      rol: "barbero"
    });

    await nuevo.save();

    res.json({ mensaje: "Barbero creado correctamente 💈" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando barbero" });
  }
};