const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
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
