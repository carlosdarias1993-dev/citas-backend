const express = require("express");
const router = express.Router();

const {
  obtenerDisponibilidad,
  crearReserva
} = require("../controllers/reservasController");

router.get("/disponibilidad", obtenerDisponibilidad);
router.post("/reservar", crearReserva);

module.exports = router;