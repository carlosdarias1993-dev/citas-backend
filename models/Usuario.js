const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,

  // 🔐 ROL
  rol: {
    type: String,
    enum: ["cliente", "barbero"],
    default: "cliente"
  }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);