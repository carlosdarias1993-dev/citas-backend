const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS (SOLUCIÓN DEFINITIVA)
app.use(cors());

// ✅ JSON
app.use(express.json());

// 🧠 "Base de datos"
let reservas = [];

// ⏰ Horas disponibles
const horas = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00"
];

// 📅 Ver disponibilidad
app.get("/disponibilidad", (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ mensaje: "Falta la fecha" });
  }

  const resultado = horas.map(hora => {
    const ocupada = reservas.find(r => r.fecha === fecha && r.hora === hora);
    return {
      hora,
      estado: ocupada ? "ocupado" : "libre"
    };
  });

  res.json(resultado);
});

// 📝 Reservar cita
app.post("/reservar", (req, res) => {
  const { fecha, hora, nombre } = req.body;

  if (!fecha || !hora || !nombre) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  const existe = reservas.find(r => r.fecha === fecha && r.hora === hora);

  if (existe) {
    return res.status(400).json({ mensaje: "Hora ya ocupada" });
  }

  reservas.push({ fecha, hora, nombre });

  res.json({ mensaje: "Reserva confirmada ✅" });
});

// 🚀 Arrancar servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});