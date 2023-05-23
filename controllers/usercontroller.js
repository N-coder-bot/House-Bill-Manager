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
    if (user.length === 0) throw "user not found";
    //console.log(user);
    await User.deleteOne(user[0]);
    res.json({ msg: "user deleted successfully!" });
  } catch (err) {
    //console.log(err);
    res.status(400).json({ error: err });
  }
};

//update user's detail.
const updateUser = async (req, res) => {
  try {
    const user = await User.find({ username: req.params.name }).exec();
    if (user.length === 0) throw "user not found";
    //console.log(user);
    user[0].username = req.body.name ? req.body.name : user[0].username;
    user[0].email = req.body.email ? req.body.email : user[0].email;
    user[0].password = req.body.password ? req.body.password : user[0].password;
    await user[0].save();
    res.json({ msg: "user details updated!", user: user[0] });
  } catch (err) {
    //console.log(err);
    res.status(400).json({ error: err });
  }
};
module.exports = { getUsers, postUser, deleteUser, updateUser };
