const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

// Defining User Schema.
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  billAmount: {
    type: Number,
    default: 0,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

// Hashing the password with a salt value of 10 before saving.
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const existingUser = await User.findOne({ username: this.username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Adding a Schema method "isValidPassword" to ensure that
// the user trying to login has the correct credentials.
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = model("User", UserSchema);
