const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ProductSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, unique: true, required: true },
  price: { type: Number },
});

modules.export = model("Product", ProductSchema);
