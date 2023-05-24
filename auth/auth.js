const moment = require("moment");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

//signup middleware.
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({
          email,
          password,
          username: req.body.username,
          createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
        });
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

//login middleware.
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        res.json({ user });
        return done(null, user, { message: "Logged in Successfully!" });
      } catch (err) {
        return done(err);
      }
    }
  )
);
