const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 FORZAR CORS BIEN
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(cors({origin: "*"}));
app.use(express.json());
// Datos en memoria
let reservas = [];

const horas = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00"
];

// Disponibilidad
app.get("/disponibilidad", (req, res) => {
  const { fecha } = req.query;

  const disponibilidad = horas.map(hora => {
    const ocupada = reservas.find(r => r.fecha === fecha && r.hora === hora);
    return {
      hora,
      estado: ocupada ? "ocupado" : "libre"
    };
  });

  res.json(disponibilidad);
});

// Reservar
app.post("/reservar", (req, res) => {
  const { nombre, fecha, hora } = req.body;

  const existe = reservas.find(r => r.fecha === fecha && r.hora === hora);

  if (existe) {
    return res.json({ mensaje: "Hora ya ocupada" });
  }

  reservas.push({ nombre, fecha, hora });

  res.json({ mensaje: "Reserva confirmada" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});