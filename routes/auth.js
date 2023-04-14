const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../config/authenticate');

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login',
  failureFlash: true,
}));

router.get('/logout', authController.getLogout);

router.get('/dashboard', ensureAuthenticated, authController.getDashboard);

module.exports = router;
