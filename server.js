const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Reserva = require("./models/Reserva");

const app = express();
const PORT = process.env.PORT || 10000;

// Conectar Mongo
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Horas disponibles
const horas = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00"
];

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Disponibilidad
app.get("/disponibilidad", async (req, res) => {
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
});

// Reservar
app.post("/reservar", async (req, res) => {
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

  res.json({ mensaje: "Reserva guardada en BD 🔥" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});