const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const orderRoutes = require("./routes/orders");

const { PORT = 3000 } = process.env;
const app = express();

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/coffeeshop_db";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

const allowedOrigins = [
  "https://ordena.ambientcoffee.com",
  "https://www.ordena.ambientcoffee.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use(requestLogger);

app.use("/orders", orderRoutes);

app.use(errorLogger);

app.use(errors());

//Middleware manejor centralizado de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "Ocurrió un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
