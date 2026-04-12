const Reserva = require("../models/Reserva");

// ================= CREAR RESERVA =================
exports.crearReserva = async (req, res) => {
  try {
    const { nombre, fecha, hora } = req.body;

    // Verificar si ya existe esa hora
    const existe = await Reserva.findOne({ fecha, hora });

    if (existe) {
      return res.status(400).json({ error: "Hora ocupada" });
    }

    const nueva = new Reserva({
      nombre,
      fecha,
      hora,
      usuario: req.usuario.id
    });

    await nueva.save();

    res.json({ mensaje: "Reserva creada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear reserva" });
  }
};

// ================= VER RESERVAS POR FECHA =================
exports.obtenerReservasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query;

    const reservas = await Reserva.find({ fecha });

    res.json(reservas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

// ================= MIS CITAS =================
exports.misCitas = async (req, res) => {
  try {
    const citas = await Reserva.find({ usuario: req.usuario.id });

    res.json(citas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
};

// ================= CANCELAR =================
exports.cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ error: "No existe" });
    }

    // Solo el dueño puede borrar
    if (reserva.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ error: "No autorizado" });
    }

    await Reserva.findByIdAndDelete(id);

    res.json({ mensaje: "Reserva eliminada" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar" });
  }
};