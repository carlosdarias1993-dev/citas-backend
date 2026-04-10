const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Base de datos en memoria
let citas = [];

// Ruta base
app.get("/", (req, res) => {
  res.send("API de citas funcionando 🚀");
});


// =========================
// 📅 CREAR CITA
// =========================
app.post("/citas", (req, res) => {
  const { cliente, fecha, hora } = req.body;

  // Validación básica
  if (!cliente || !fecha || !hora) {
    return res.status(400).json({
      mensaje: "Faltan datos"
    });
  }

  // Configuración negocio
  const horaApertura = 9;
  const horaCierre = 18;
  const duracion = 30; // minutos

  // Convertir hora a minutos
  const [h, m] = hora.split(":").map(Number);
  const minutosCita = h * 60 + m;

  const aperturaMin = horaApertura * 60;
  const cierreMin = horaCierre * 60;

  // ❌ Fuera de horario
  if (minutosCita < aperturaMin || minutosCita >= cierreMin) {
    return res.status(400).json({
      mensaje: "Fuera del horario del negocio"
    });
  }

  // ❌ Solo intervalos de 30 min
  if (m !== 0 && m !== 30) {
    return res.status(400).json({
      mensaje: "Solo se permiten intervalos de 30 minutos"
    });
  }

  // ❌ Evitar solapamientos
  const conflicto = citas.find(c => {
    if (c.fecha !== fecha) return false;

    const [ch, cm] = c.hora.split(":").map(Number);
    const citaExistente = ch * 60 + cm;

    return Math.abs(citaExistente - minutosCita) < duracion;
  });

  if (conflicto) {
    return res.status(400).json({
      mensaje: "Horario ocupado"
    });
  }

  const nuevaCita = { cliente, fecha, hora };
  citas.push(nuevaCita);

  res.json({
    mensaje: "Cita creada",
    cita: nuevaCita
  });
});


// =========================
// 📋 VER CITAS
// =========================
app.get("/citas", (req, res) => {
  res.json(citas);
});


// =========================
// 🕒 DISPONIBILIDAD
// =========================
app.get("/disponibilidad", (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({
      mensaje: "Debes enviar una fecha"
    });
  }

  const horaApertura = 9;
  const horaCierre = 18;
  const duracion = 30;

  let disponibilidad = [];

  for (let tiempo = horaApertura * 60; tiempo < horaCierre * 60; tiempo += duracion) {
    const h = Math.floor(tiempo / 60).toString().padStart(2, "0");
    const m = (tiempo % 60).toString().padStart(2, "0");

    const horaStr = `${h}:${m}`;

    const ocupado = citas.find(c => c.fecha === fecha && c.hora === horaStr);

    disponibilidad.push({
      hora: horaStr,
      estado: ocupado ? "ocupado" : "libre"
    });
  }

  res.json(disponibilidad);
});


// =========================
// 🚀 SERVIDOR
// =========================
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000 🚀");
});