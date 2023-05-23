const express = require("express");
const router = express.Router();

const USERS = require("../../Users");
const {
  getUsers,
  postUser,
  deleteUser,
} = require("../../controllers/usercontroller");

//1.getting all users.
router.get("/get", getUsers);

//2. adding a customer.
router.post("/add", postUser);

//3. deleting a customer (by name). should only be done by admin.
router.delete("/:name", deleteUser);

//4. Updating email or username or password of a user.
router.put("update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //add not found statement later...
  const found = USERS.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    USERS.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email ? req.body.email : user.email;
        user.password = req.body.password ? req.body.password : user.password;
        res.json({ msg: "user updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});
module.exports = router;
