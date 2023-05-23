const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

module.exports = model("User", UserSchema);
