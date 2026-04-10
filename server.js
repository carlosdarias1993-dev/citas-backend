const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Base de datos en memoria
let citas = [];

// Ruta test
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Crear cita
app.post("/citas", (req, res) => {
  const { cliente, fecha, hora } = req.body;

  if (!cliente || !fecha || !hora) {
    return res.status(400).json({
      mensaje: "Faltan datos"
    });
  }

  const existe = citas.find(c => c.fecha === fecha && c.hora === hora);

  if (existe) {
    return res.status(400).json({
      mensaje: "Horario ocupado"
    });
  }

  citas.push({ cliente, fecha, hora });

  res.json({
    mensaje: "Cita creada"
  });
});

// Ver citas
app.get("/citas", (req, res) => {
  res.json(citas);
});

// Disponibilidad
app.get("/disponibilidad", (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ mensaje: "Falta fecha" });
  }

  const apertura = 9;
  const cierre = 18;

  let horas = [];

  for (let i = apertura; i < cierre; i++) {
    let horaStr = i.toString().padStart(2, "0") + ":00";

    const ocupada = citas.find(c => c.fecha === fecha && c.hora === horaStr);

    horas.push({
      hora: horaStr,
      estado: ocupada ? "ocupado" : "libre"
    });
  }

  res.json(horas);
});

// Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});