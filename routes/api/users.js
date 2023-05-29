const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const {
  userInfo,
  signUpRender,
  createUser,
  loginRender,
  success,
  getUsers,
  deleteUser,
  updateUser,
} = require("../../controllers/usercontroller");

//USER SPECIFIC ROUTES-----
//1. user information.
router.get("/user", userInfo);
//2. user signup form.
router.get("/signup", signUpRender);
//3. user creation.
router.post("/signup", createUser);
//4. user login from.
router.get("/login/password", loginRender);
//5. user authentication using passport.
router.post(
  "/login/password",
  passport.authenticate("login", {
    failureRedirect: "/login/password",
    failureMessage: true,
  }),
  success
);
//GENERAL USER ROUTES---.
//1. get all users.
router.get("/users", getUsers);
//2. delete a user by name.
router.delete("/user/name", deleteUser);
//3. update user's detaul.
router.put("/user/name", updateUser);
module.exports = router;
