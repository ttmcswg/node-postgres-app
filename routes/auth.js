const auth = require('express').Router();
const { authController } = require('../controllers');

auth.post('/login', authController.login);

module.exports = auth;
