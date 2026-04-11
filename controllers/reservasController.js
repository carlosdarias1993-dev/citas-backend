const Reserva = require("../models/Reserva");

const horas = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00"
];

exports.obtenerDisponibilidad = async (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ error: "Falta fecha" });
  }

  const reservas = await Reserva.find({ fecha });

  const resultado = horas.map(hora => {
    const ocupada = reservas.find(r => r.hora === hora);
    return {
      hora,
      estado: ocupada ? "ocupado" : "libre"
    };
  });

  res.json(resultado);
};

exports.crearReserva = async (req, res) => {
  const { fecha, hora, nombre } = req.body;

  if (!fecha || !hora || !nombre) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const existe = await Reserva.findOne({ fecha, hora });

  if (existe) {
    return res.status(400).json({ error: "Hora ocupada" });
  }

  const nuevaReserva = new Reserva({ fecha, hora, nombre });
  await nuevaReserva.save();

  res.json({ mensaje: "Reserva guardada 🔥" });
};