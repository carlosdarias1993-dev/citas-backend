const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  nombre: String,
  fecha: String,
  hora: String
});

module.exports = mongoose.model("Reserva", ReservaSchema);