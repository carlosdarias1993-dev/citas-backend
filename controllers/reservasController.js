const Reserva = require("../models/Reserva");

// 📅 VER DISPONIBILIDAD
exports.obtenerDisponibilidad = async (req, res) => {
  try {
    const { fecha } = req.query;

    const horas = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00"
    ];

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

// 🆕 RESERVAR
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

    res.json({ mensaje: "Reserva creada" });

  } catch (error) {
    res.status(500).json({ error: "Error al reservar" });
  }
};

// 📋 MIS CITAS (NUEVO)
exports.misCitas = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const citas = await Reserva.find({ usuario: usuarioId })
      .sort({ fecha: 1, hora: 1 });

    res.json(citas);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};