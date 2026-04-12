require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔗 RUTAS
const authRoutes = require("./routes/auth");
const reservasRoutes = require("./routes/reservas");

app.use("/api/auth", authRoutes);
app.use("/api", reservasRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo conectado"))
.catch(err => console.log(err));

// SERVER
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});