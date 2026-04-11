const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const reservasRoutes = require("./routes/reservas");

const app = express();
const PORT = process.env.PORT || 10000;

connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/", reservasRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});