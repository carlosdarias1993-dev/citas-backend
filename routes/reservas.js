const express = require("express");
const router = express.Router();

const reservasController = require("../controllers/reservasController");
const authMiddleware = require("../middleware/authMiddleware");

// CREAR
router.post("/", authMiddleware, reservasController.crearReserva);

// VER POR FECHA
router.get("/", authMiddleware, reservasController.obtenerReservasPorFecha);

// MIS CITAS
router.get("/mis-citas", authMiddleware, reservasController.misCitas);

// CANCELAR
router.delete("/:id", authMiddleware, reservasController.cancelarReserva);

module.exports = router;