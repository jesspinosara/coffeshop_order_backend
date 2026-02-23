const Order = require("../models/order");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createOrder = async (req, res, next) => {
  try {
    const { name, email, drinkName, totalPrice, selections } = req.body;

    if (!email || !name) {
      const error = new Error("El nombre y el email son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    // 1.Buscar si el usuario ya existe por su email
    let user = await User.findOne({ email });

    // 2.Si no existe, se crea con un registro silencioso
    if (!user) {
      const hasehdPassword = await bcrypt.hash("default123", 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    // 3.Se crea la orden, vinculándola al ID del usuario (el owner)
    const newOrder = await Order.create({
      drinkName,
      totalPrice,
      selections,
      owner: user._id,
    });

    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder };
