const db = require("../models");
const passport = require("passport");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = (req, res) => {
  // Registration logic here
};

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/users/dashboard",
  failureRedirect: "/users/login",
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.getDashboard = (req, res) => {
  res.render("dashboard", { user: req.user });
};
