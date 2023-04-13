const bcrypt = require('bcrypt');
const { user } = require('../models');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({ username, password: hashedPassword });
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in', err });
      }
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = (req, res) => {
  res.status(200).json(req.user);
};

const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
};

const getCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
