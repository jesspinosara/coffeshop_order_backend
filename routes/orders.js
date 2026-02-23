const router = require("express").Router();
const { createOrder } = require("../controllers/order");

//Ruta para crear un pedido y usuario (automáticamente)
router.post("/", createOrder);

//Opcional para ver el historial de pedidos
//router.get("/", getOrders);

module.exports = router;
