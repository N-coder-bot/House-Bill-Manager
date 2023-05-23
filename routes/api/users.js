const express = require("express");
const router = express.Router();

const USERS = require("../../Users");
const {
  getUsers,
  postUser,
  deleteUser,
  updateUser,
} = require("../../controllers/usercontroller");

//1.getting all users.
router.get("/get", getUsers);

//2. adding a customer.
router.post("/add", postUser);

//3. deleting a customer (by name). should only be done by admin.
router.delete("/:name", deleteUser);

//4. Updating email or username or password of a user.
router.put("/:name", updateUser);
module.exports = router;
