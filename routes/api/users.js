const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const { isAuth } = require("../../auth/authMiddleware");
const {
  userInfo,
  signUpRender,
  loginRender,
  createUser,
  success,
  getUsers,
  deleteUser,
  updateUser,
} = require("../../controllers/usercontroller");

const {
  addProduct,
  userProducts,
  productForm,
  calculateBill,
} = require("../../controllers/productcontroller");

//USER SPECIFIC ROUTES-----
//1. user information.
router.get("/user", isAuth, userInfo);
//2. user signup form.
router.get("/signup", signUpRender);
//3. user creation.
router.post("/signup", createUser);
// 4. user login from.
router.get("/login/password", loginRender);
//5. user authentication using passport.
router.post(
  "/login/password",
  passport.authenticate("login", {
    failureRedirect: "/login-failure",
    successRedirect: "/users/login-success",
  }),
  success
);
router.get("/login-success", (req, res) => {
  res.json({ user: req.user });
});

//logout.
router.get("/logout", isAuth, (req, res) => {
  req.logout();
  res.redirect("/users");
});
//6. user add product.
router.post("/product/add", isAuth, addProduct);
//7. User get products.
router.get("/products", isAuth, userProducts);
//8. User Product Form.
router.get("/product/add", isAuth, productForm);
//9. Calculate Bill.
router.get("/products/bill", isAuth, calculateBill);
//GENERAL USER ROUTES---.
//1. get all users.
router.get("/", getUsers);
//2. delete a user by name.
router.delete("/name", deleteUser);
//3. update user's detaul.
router.put("/name", isAuth, updateUser);
//4. is in session?
router.get("/checkAuth", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ msg: "logged in" });
  } else {
    res.json({ msg: "not logged in" });
  }
});
module.exports = router;
