const passport = require("passport");
//serializeUser is called just after a user is logged in successfully.
passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    username: user.username,
  });
});
//after user signs out.
passport.deserializeUser((user, done) => {
  done(null, user);
});
