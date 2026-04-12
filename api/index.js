const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const reservasRoutes = require("../routes/reservas");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 CONEXIÓN MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api", reservasRoutes);

// EXPORTAR (IMPORTANTE EN VERCEL)
module.exports = app;