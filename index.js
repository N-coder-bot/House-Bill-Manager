const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo"); //for session store.
const moment = require("moment"); //for date formatting.
const passport = require("passport");
const session = require("express-session"); // for session creation.
const cookieParser = require("cookie-parser");

const Product = require("./models/Product");

require("./auth/auth");
require("./config/passport");
require("dotenv").config();

//setting middlewares for request parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
  // origin: [
  //   "https://houbse-bill-manager-front-end.vercel.app",
  //   "http://localhost:5173",
  // ],
  origin: "https://houbse-bill-manager-front-end.vercel.app",
  credentials: true,
};
//setting cors middleware.
app.use(cors(corsOptions));

//view engine setup middlewares.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);
const PORT = process.env.PORT || 8000;
const uri = process.env.URI;
// connecting to mongodb database.
require("./config/database");

//storing sessions in database under "sessions" collection.
const sessionstore = MongoStore.create({
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
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    },
    name: "naman",
  })
);
// initialise passport verification and authentication.
app.use(passport.initialize());
app.use(passport.session());

//User Routes.

app.use("/users", require("./routes/api/users"));
//Product Routes.
app.use("/products", require("./routes/api/products"));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
