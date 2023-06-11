const passport = require("passport");
const User = require("../models/User");
//serializeUser is called just after a user is logged in successfully.
passport.serializeUser((user, done) => {
  console.log(user, "from the serialize user");
  console.log("mein serialised mein hu");
  done(null, user._id);
});
//STORES OBJECT GIVEN TO DONE INTO THE REQUEST FIELD OF THE REQ,RES SYSTEM.
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    console.log(user, "from the Deserialize user");
    done(null, user); //here req.user will store user.
  } catch (err) {
    console.log(err);
    done(err);
  }
});
