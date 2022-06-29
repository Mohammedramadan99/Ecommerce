const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  customerMsg: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
    default: "تم ارساله",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
