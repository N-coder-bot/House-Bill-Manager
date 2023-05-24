const User = require("../models/User");

//read all users.
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

//User Sign Up using Passport.js
const postUser = async (req, res) => {};

//User Login using Passport.js
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
