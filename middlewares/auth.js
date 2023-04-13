const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "You must be signed in to access that page.");
  res.redirect("/users/login");
};


const isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({ message: 'Already authenticated' });
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
