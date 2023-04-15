const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../config/authenticate');

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/login', authController.getLogin);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await db.user.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/home');
    });
  } catch (error) {
    console.error(error);
    res.redirect('/users/register');
  }
});


router.get('/logout', authController.getLogout);

router.get('/dashboard', ensureAuthenticated, authController.getDashboard);

module.exports = router;
