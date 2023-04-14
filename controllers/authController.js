const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('users/login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true,
});

exports.getRegister = (req, res) => {
  res.render('users/register');
};

exports.postRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return res.redirect('/auth/register');
      }
      return res.redirect('/dashboard');
    });
  } catch (error) {
    console.log(error);
    res.redirect('/auth/register');
  }
};

exports.getDashboard = (req, res) => {
  res.render('users/dashboard', { user: req.user });
};

