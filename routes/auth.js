const auth = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// const authController = require('../controllers/authController');

auth.get('test', (req, res) => {
  res.json('kek');
});

auth.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (!user) {
      res.status(401).json('Login failed');
    } else {
      const token = jwt.sign({ data: user }, jwtSecret, {
        expiresIn: 10000
      });

      return res.json({ user, token: `Bearer ${token}` });
    }
  })(req, res);
});

module.exports = auth;
