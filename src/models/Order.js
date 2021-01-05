const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  items: [
    {
      _id: {
        required: false,
      },

      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
      },
      shipmentId: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
