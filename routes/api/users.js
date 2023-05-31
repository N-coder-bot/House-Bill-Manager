const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const {
  userInfo,
  signUpRender,
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
router.get("/user", userInfo);
//2. user signup form.
router.get("/user/signup", signUpRender);
//3. user creation.
router.post("/user/signup", createUser);
//4. user login from.
// router.get("/user/login/password", loginRender);
//5. user authentication using passport.
router.post(
  "/user/login/password",
  passport.authenticate("login", {
    failureRedirect: "/users/user/login/password",
    failureMessage: true,
  }),
  success
);
//6. user add product.
router.post("/user/product/add", addProduct);
//7. User get products.
router.get("/user/products", userProducts);
//8. User Product Form.
router.get("/user/product/add", productForm);
//9. Calculate Bill.
router.get("/user/products/bill", calculateBill);
//GENERAL USER ROUTES---.
//1. get all users.
router.get("/", getUsers);
//2. delete a user by name.
router.delete("/user/name", deleteUser);
//3. update user's detaul.
router.put("/user/name", updateUser);
module.exports = router;
