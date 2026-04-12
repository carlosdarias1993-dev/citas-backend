const Reserva = require("../models/Reserva");

// 📅 DISPONIBILIDAD
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
    res.status(500).json({ error: "Error obteniendo disponibilidad" });
  }
};

// 🔐 RESERVAR
exports.reservar = async (req, res) => {
  try {
    const { fecha, hora, nombre } = req.body;
    const usuarioId = req.usuario.id;

    const existe = await Reserva.findOne({ fecha, hora });

    if (existe) {
      return res.status(400).json({ error: "Hora ocupada" });
    }

    const nueva = new Reserva({
      fecha,
      hora,
      nombre,
      usuario: usuarioId
    });

    await nueva.save();

    res.json({ mensaje: "Reserva creada 🔥" });

  } catch (error) {
    res.status(500).json({ error: "Error al reservar" });
  }
};

// 📋 MIS CITAS
exports.misCitas = async (req, res) => {
  try {
    const citas = await Reserva.find({ usuario: req.usuario.id })
      .sort({ fecha: 1, hora: 1 });

    res.json(citas);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};

// ❌ CANCELAR
exports.cancelarCita = async (req, res) => {
  try {
    const cita = await Reserva.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    if (cita.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ error: "No autorizado" });
    }

    await Reserva.findByIdAndDelete(req.params.id);

    res.json({ mensaje: "Cita cancelada" });

  } catch (error) {
    res.status(500).json({ error: "Error al cancelar" });
  }
};

// 💈 AGENDA BARBERO (NUEVO)
exports.agenda = async (req, res) => {
  try {
    const { fecha } = req.query;

    const citas = await Reserva.find({ fecha })
      .sort({ hora: 1 });

    res.json(citas);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo agenda" });
  }
};