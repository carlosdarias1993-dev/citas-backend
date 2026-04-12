const express = require("express");
const router = express.Router();

const reservasController = require("../controllers/reservasController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/disponibilidad", reservasController.obtenerDisponibilidad);
router.post("/reservar", authMiddleware, reservasController.reservar);
router.get("/mis-citas", authMiddleware, reservasController.misCitas);

// 🔥 NUEVO
router.get("/agenda", authMiddleware, reservasController.agenda);

module.exports = router;