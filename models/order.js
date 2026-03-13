const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  drinkName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  selections: {
    type: Object,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema);
