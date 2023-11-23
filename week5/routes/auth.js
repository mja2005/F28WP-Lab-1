const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/loginp', authController.loginp);
router.get('/profile', authController.isLoggedIn, authController.profile);
router.get('/logout', authController.isLoggedIn, authController.logout);

module.exports = router;

