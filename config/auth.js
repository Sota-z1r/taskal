module.exports = {
  //checkAuthenticated
  checkAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/top");
  },
  //checkNotAuthenticated
  checkNotAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/top");
    }
    next();
  },
};
