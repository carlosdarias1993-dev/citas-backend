const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// CORS
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let reservas = [];

// Horas disponibles
const horas = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00"
];

// Ruta raíz (para evitar Not Found)
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Disponibilidad
app.get("/disponibilidad", (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ error: "Falta fecha" });
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

// Reservar
app.post("/reservar", (req, res) => {
  const { fecha, hora, nombre } = req.body;

  if (!fecha || !hora || !nombre) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const existe = reservas.find(r => r.fecha === fecha && r.hora === hora);

  if (existe) {
    return res.status(400).json({ error: "Hora ocupada" });
  }

  reservas.push({ fecha, hora, nombre });

  res.json({ mensaje: "Reserva creada" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});