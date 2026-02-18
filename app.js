const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/coffeeshop_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
