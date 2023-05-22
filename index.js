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
app.get("/api/members/get", (req, res) => {
  res.status(200).json(USERS);
});

//2. adding a customer.
app.post("/api/members/add", (req, res) => {
  const { id, name, email, password } = req.body;
  const createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");
  const user = {
    id,
    name,
    email,
    password,
    createdAt,
  };
  if (email == "" || password == "")
    res.status(400).json({ msg: "User must have an email and a password." });
  else {
    USERS.push(user);
    res.status(200).json(USERS);
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
