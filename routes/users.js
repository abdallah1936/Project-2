const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);
router.get("/register", authController.getRegister);

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/users/workouts',
  failureRedirect: '/register',
  failureFlash: true,
}));

module.exports = router;