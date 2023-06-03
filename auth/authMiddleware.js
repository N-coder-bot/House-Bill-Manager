const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthenticated User!" });
  }
};
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated && req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized Access!" });
  }
};
module.exports = { isAuth, isAdmin };
