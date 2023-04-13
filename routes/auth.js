const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth');

router.get('/signup', isLoggedOut, authController.signup_get);
router.post('/signup', isLoggedOut, authController.signup_post);
router.get('/login', isLoggedOut, authController.login_get);
router.post('/login', isLoggedOut, authController.login_post);
router.get('/logout', isLoggedIn, authController.logout);

module.exports = router;
