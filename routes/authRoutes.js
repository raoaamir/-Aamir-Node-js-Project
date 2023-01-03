const { Router } = require('express');
const authController = require('../controller/authController');

const router = Router();

router.get('/signup', authController.signup_view);
router.get('/login', authController.login_view);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;