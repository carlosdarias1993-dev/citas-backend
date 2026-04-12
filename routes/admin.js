const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// CREAR BARBERO
router.post("/crear-barbero", authMiddleware, adminController.crearBarbero);

module.exports = router;