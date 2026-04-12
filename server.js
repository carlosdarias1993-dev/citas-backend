const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const reservasRoutes = require("./routes/reservas");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", reservasRoutes);

// 🚀 IMPORTANTE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});