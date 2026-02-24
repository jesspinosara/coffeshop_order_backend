const Order = require("../models/order");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "dev-secret" } = process.env;

// 1. POST /orders y el registro silencioso + crear pedido
const createOrder = async (req, res, next) => {
  try {
    const { name, email, drinkName, totalPrice, selections } = req.body;

    // Buscar si el usuario ya existe por su email
    let user = await User.findOne({ email });
    if (!user) {
      const hasehdPassword = await bcrypt.hash("default123", 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    // 2. Crear orden
    const newOrder = await Order.create({
      drinkName,
      totalPrice,
      selections,
      owner: user._id,
    });

    res.status(201).send({ message: "¡Orden recibida!", order: newOrder });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder };
