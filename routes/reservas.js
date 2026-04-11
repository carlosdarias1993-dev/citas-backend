const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  obtenerDisponibilidad,
  crearReserva
} = require("../controllers/reservasController");

// 🔓 pública
router.get("/disponibilidad", obtenerDisponibilidad);

// 🔐 protegida
router.post("/reservar", auth, crearReserva);

module.exports = router;