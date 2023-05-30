const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ProductSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = model("Product", ProductSchema);
