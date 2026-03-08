const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  drinkName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  selections: {
    size: String,
    milk: String,
    ice: String,
    sweetness: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema);
