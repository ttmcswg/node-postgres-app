const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (!user) {
      res.status(401).json({ error: 'Login failed' });
    } else {
      const { user_password, ...userData } = user;
      const token = jwt.sign({ data: userData }, jwtSecret, { expiresIn: 10000 });

      return res.json({ userData, token: `Bearer ${token}` });
    }
  })(req, res);
};

module.exports = {
  login
};
