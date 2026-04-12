const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  nombre: String,
  fecha: String,
  hora: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  }
});

module.exports = mongoose.model("Reserva", ReservaSchema);