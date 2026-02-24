const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const { createOrder } = require("../controllers/order");

//Ruta para crear un pedido y usuario (automáticamente)
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      drinkName: Joi.string().required(),
      totalPrice: Joi.number().required(),
      selections: Joi.object().required(),
    }),
  }),
  createOrder,
);

//Opcional para ver el historial de pedidos
//router.get("/", getOrders);

module.exports = router;
