const bcrypt = require("bcryptjs");
const passport = require("passport");
const { User } = require("../models");

exports.getLogin = (req, res) => {
  res.render("users/login", { user: req.user });
};

exports.getRegister = (req, res) => {
  res.render("users/register", { user: req.user });
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).send("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    return res.status(500).send("Error creating user.");
  }

  req.login(newUser, (err) => {
    if (err) {
      return res.status(500).send("Error logging in after registration.");
    }
    return res.redirect("/users/dashboard");
  });
};

exports.postLogin = passport.authenticate("local", {
  successRedirect: "/users/dashboard",
  failureRedirect: "/users/login",
  failureFlash: true,
});

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};
