const { boolean } = require("joi");
const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const categories = ["grocery", "healthcare", "cosmetics", "clothing"];
const ProductSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return value > 0;
      },
      message: "Price must be greater than 0.",
    },
  },
  category: { type: String, required: true, enum: categories },
  isCalculated: { type: Boolean },
});

module.exports = model("Product", ProductSchema);
