const User = require("../models/User");
const moment = require("moment");

//1. get userinfo.
const userInfo = (req, res) => {
  res.json({ user: req.user });
};
//2. render signup page.
const signUpRender = (req, res) => {
  res.render("signup");
};
//3. create user in the database.
const createUser = async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      billAmount: 0,
    });

    await user.save();
    res.json({ user: user });
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

//4. render login page.
const loginRender = (req, res) => {
  res.render("login");
};
//5. redirect if successfully logged in.
const success = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.redirect(303, "/users/login-success");
};
//6. read all users.
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
//7. delete a user by username.
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
//8. update user's detail.
const updateUser = async (req, res) => {
  try {
    const user = await User.find({ username: req.params.name }).exec();
    if (user.length === 0) throw "user not found";
    //console.log(user);
    user[0].username = req.body.name ? req.body.name : user[0].username;
    user[0].password = req.body.password ? req.body.password : user[0].password;
    await user[0].save();
    res.json({ msg: "user details updated!", user: user[0] });
  } catch (err) {
    //console.log(err);
    res.status(400).json({ error: err });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  userInfo,
  loginRender,
  signUpRender,
  success,
};
