const middlewareObject = {
  // a middleware to check if a user is logged in or not
  isNotLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },

  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/signin");
  }
};

export default middlewareObject;
