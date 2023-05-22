const express = require("express");
const app = express();
const USERS = require("./Users");
const moment = require("moment");

const PORT = process.env.PORT || 8000;

//setting middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Members Routes

//1.getting all customers.
app.get("/api/users/get", (req, res) => {
  res.status(200).json(USERS);
});

//2. adding a customer.
app.post("/api/users/add", (req, res) => {
  const createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");
  const user = {
    ...req.body,
    createdAt,
  };
  if (!email || !password)
    res.status(400).json({ msg: "User must have an email and a password." });
  else {
    USERS.push(user);
    res.status(200).json(USERS);
  }
});

//3. deleting a customer (by id). should only be done by admin.
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //add not found statement later...
  res.status(200).json({
    users: USERS.filter((user) => user.id !== id),
  });
});
//4. Updating email or username or password of a user.
app.put("/api/users/update/:id", (req, res) => {
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
  res.status(200).json({});
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
