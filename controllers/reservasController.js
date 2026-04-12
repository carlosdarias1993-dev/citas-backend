const Reserva = require("../models/Reserva");

// DISPONIBILIDAD
exports.obtenerDisponibilidad = async (req, res) => {
  try {
    const { fecha } = req.query;

    const horas = ["09:00","10:00","11:00","12:00","13:00"];

    const reservas = await Reserva.find({ fecha });

    const disponibilidad = horas.map(hora => {
      const ocupada = reservas.find(r => r.hora === hora);

      return {
        hora,
        estado: ocupada ? "ocupado" : "libre"
      };
    });

    res.json(disponibilidad);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error disponibilidad" });
  }
};

// RESERVAR
exports.reservar = async (req, res) => {
  try {
    const { fecha, hora, nombre } = req.body;

    const existe = await Reserva.findOne({ fecha, hora });

    if (existe) {
      return res.status(400).json({ error: "Hora ocupada" });
    }

    const nueva = new Reserva({
      fecha,
      hora,
      nombre,
      usuario: req.usuario.id
    });

    await nueva.save();

    res.json({ mensaje: "Reserva creada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reservar" });
  }
};

// MIS CITAS
exports.misCitas = async (req, res) => {
  try {
    const citas = await Reserva.find({ usuario: req.usuario.id });

    res.json(citas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error citas" });
  }
};

// AGENDA
exports.agenda = async (req, res) => {
  try {
    const { fecha } = req.query;

    const citas = await Reserva.find({ fecha });

    res.json(citas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error agenda" });
  }
};