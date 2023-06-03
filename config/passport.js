const passport = require("passport");
const User = require("../models/User");
//serializeUser is called just after a user is logged in successfully.
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//STORES OBJECT GIVEN TO DONE INTO THE REQUEST FIELD OF THE REQ,RES SYSTEM.
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user); //here req.user will store user.
  } catch (err) {
    done(err);
  }
});
