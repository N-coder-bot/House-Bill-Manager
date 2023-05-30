const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const categories = ["grocery", "healthcare", "cosmetics", "clothing"];
const ProductSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: categories },
});

module.exports = model("Product", ProductSchema);
