const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🧠 Base de datos en memoria
let reservas = [];

// ⏰ Horas disponibles
const horas = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

// 📅 VER DISPONIBILIDAD
app.get("/disponibilidad", (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ error: "Falta la fecha" });
  }

  const disponibilidad = horas.map(hora => {
    const ocupada = reservas.find(r => r.fecha === fecha && r.hora === hora);
    return {
      hora,
      estado: ocupada ? "ocupado" : "libre"
    };
  });

  res.json(disponibilidad);
});


// 📝 RESERVAR CITA
app.post("/reservar", (req, res) => {
  const { fecha, hora, nombre } = req.body;

  if (!fecha || !hora || !nombre) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  // 🚫 Verificar si ya está ocupada
  const existe = reservas.find(r => r.fecha === fecha && r.hora === hora);

  if (existe) {
    return res.json({ mensaje: "Hora ya reservada" });
  }

  // ✅ Guardar reserva
  reservas.push({ fecha, hora, nombre });

  res.json({ mensaje: "Reserva confirmada ✅" });
});


// 🌐 RUTA BASE
app.get("/", (req, res) => {
  res.send("Servidor de citas funcionando 🚀");
});


// 🚀 INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});