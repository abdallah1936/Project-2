const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../config/auth.js');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/dashboard', ensureAuthenticated, authController.getDashboard);
router.get('/logout', authController.getLogout);

module.exports = router;
