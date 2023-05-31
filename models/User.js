const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { model, Schema } = mongoose;

//Defining User Schema.
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  billAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

//hashing the password with salt value 10.
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//adding Schema Method IsValidPassword to ensure that
//the user trying to login has the correct credentials.
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
module.exports = model("User", UserSchema);
