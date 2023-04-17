const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

router.get('/login', (req, res) => {
  res.render('users/login', { user: req.user });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/register', (req, res) => {
  res.render('users/register', { user: req.user });
});

router.post('/register', async (req, res) => {
  const { name, email, username, password, password2 } = req.body;

  // Validate input
  let errors = [];

  if (!name || !email || !username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    return res.render("users/register", {
      errors,
      name,
      email,
      username,
      password,
      password2,
    });
  }

  try {
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      errors.push({ msg: "Username is already taken" });
      return res.render("users/register", {
        errors,
        name,
        email,
        username,
        password,
        password2,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return res.redirect('/users/register');
      }
      return res.redirect('/users/dashboard');
    });
  } catch (error) {
    console.log(error);
    res.redirect('/users/register');
  }
});

router.get('/dashboard', (req, res) => {
  res.render('users/dashboard', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
