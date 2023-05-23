const User = require("../models/User");
const moment = require("moment");

//read all users.
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

//add a user.
const postUser = async (req, res) => {
  const newUser = new User({
    ...req.body,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  });
  if (!newUser.email || !newUser.password) throw err;
  try {
    const result = await newUser.save();
    res.json({ newUser });
  } catch (err) {
    //console.log(err);
    res.status(400).json("Please Enter Email and Password.");
  }
};

//delete a user by name.
const deleteUser = async (req, res) => {
  try {
    const user = await User.find({ username: req.params.name }).exec();
    //console.log(user);
    await User.deleteOne(user[0]);
    res.json({ msg: "user deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "user not found" });
  }
};
module.exports = { getUsers, postUser, deleteUser };
