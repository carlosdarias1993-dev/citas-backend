const express = require("express");
const router = express.Router();

const reservasController = require("../controllers/reservasController");
const authMiddleware = require("../middleware/authMiddleware");

// DISPONIBILIDAD
router.get("/disponibilidad", reservasController.obtenerDisponibilidad);

// RESERVAR
router.post("/reservar", authMiddleware, reservasController.reservar);

// MIS CITAS
router.get("/mis-citas", authMiddleware, reservasController.misCitas);

// CANCELAR
router.delete("/cancelar/:id", authMiddleware, reservasController.cancelarCita);

module.exports = router;