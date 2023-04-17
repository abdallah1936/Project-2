const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/workouts",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  let errors = [];
  res.render("users/register", { user: req.user, errors });
});

router.post("/register", async (req, res) => {
  const { name, email, username, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !username || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("users/register", { errors, name, email, username, password, password2 });
  } else {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("users/register", { errors, name, email, username, password, password2 });
      } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.log(err);
            res.redirect("/users/register");
          } else {
            const newUser = await User.create({
              name: name,
              email: email,
              username: username,
              password: hash,
            });

            req.flash("success_messages", "You are now registered and can log in");
            res.redirect("/users/login");
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.redirect("/users/register");
    }
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
