const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo"); //for session store.
const moment = require("moment"); //for date formatting.
const passport = require("passport");
const session = require("express-session"); // for session creation.

require("./auth/auth");
require("./config/passport");
require("dotenv").config();

//setting middlewares for request parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//view engine setup middlewares.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@users.qaljg9a.mongodb.net/?retryWrites=true&w=majority`;

// connecting to mongodb database.
require("./config/database");

//storing sessions in database under "sessions" collection.
const sessionstore = new MongoStore({
  mongoUrl: uri,
  collectionName: "sessions",
});
//middleware to create a session.
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
//initialise passport verification and authentication.
app.use(passport.initialize());
app.use(passport.authenticate("session"));

//User Routes.
app.use("/", require("./routes/api/users"));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
