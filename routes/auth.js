const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/login');
  }
}

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/dashboard', ensureAuthenticated, authController.getDashboard);

module.exports = router;
