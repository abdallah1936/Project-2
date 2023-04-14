const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

const isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/dashboard');
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
