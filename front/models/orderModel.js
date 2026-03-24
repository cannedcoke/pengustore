const mongoose = require("mongoose");

// esquema para las ordenes .
// estos esuqemas me permiten aggregar mas rigidez
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 0 },
      },
    ],
  },
  { timestamps: true },
);
module.exports = mongoose.model("Order", orderSchema);