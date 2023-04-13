const bcrypt = require('bcrypt');
const { user } = require('../models');

exports.signup_get = (req, res) => {
  res.render('users/register');
};

exports.signup_post = async (req, res) => {
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

exports.login_get = (req, res) => {
  res.render('users/login');
};

exports.login_post = (req, res) => {
  res.status(200).json(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
};
