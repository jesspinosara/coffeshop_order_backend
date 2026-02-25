const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const orderRoutes = require("./routes/orders");

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

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
