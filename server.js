try {
  require("dotenv").config();
} catch (e) {}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
const authRoutes = require("./routes/auth");
const reservasRoutes = require("./routes/reservas");
const adminRoutes = require("./routes/admin");

app.use("/api/auth", authRoutes);
app.use("/api", reservasRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo conectado"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});