const authController = require('./auth.controller')
const router = require('express').Router();

router.post('/login', authController.login);

router.post('/changePassword', authController.changePassword);

module.exports = router;