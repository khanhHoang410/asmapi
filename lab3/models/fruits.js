const mongoose = require("mongoose");
const { router } = require("../app");

const Scheme = mongoose.Schema;

const Fruits = new Scheme(
  {
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    status: { type: Number },
    image: { type: Number },
    description: { type: String },
    id_distributor: { type: Scheme.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("fruit", Fruits);
