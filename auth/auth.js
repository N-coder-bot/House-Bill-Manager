const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/User");
//custom fields in case the fields are different from the default used in the strategy.
const customFields = {
  usernameField: "username",
  passwordField: "password",
};
//verify callback to be put in passport strategy.
const verifycallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    // console.log(user);
    if (!user)
      return done(null, false, { message: "Incorrect username or password" });
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword)
      return done(null, false, { message: "Incorrect username or password" });
    return done(null, user); //user successfully authenticated.
  } catch (error) {
    return done(error);
  }
};
//signIn/Login middleware using Passport.
passport.use("login", new localStrategy(customFields, verifycallback));
