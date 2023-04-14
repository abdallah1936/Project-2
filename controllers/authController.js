const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('users/login', { user: null });
};


exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
};

exports.getRegister = (req, res) => {
  res.render('users/register', { user: null });
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

exports.getLogout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
};