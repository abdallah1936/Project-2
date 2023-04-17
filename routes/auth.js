const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const passport = require("passport");

// GET login page
router.get("/login", (req, res) => {
  res.render("users/login");
});

// GET register page
router.get("/register", (req, res) => {
  res.render("users/register");
});

// POST register
router.post('/register', (req, res) => {
  const { name, email, username, password, password2 } = req.body;

  router.post("/register", authController.postRegister);

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
    res.render("users/register", {
      errors,
      name,
      email,
      username,
      password,
      password2,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username is already taken" });
        res.render("users/register", {
          errors,
          name,
          email,
          username,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          username,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// POST login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// GET logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
