const routes = require('express').Router();
const passport = require('passport');
const auth = require('./auth');
const users = require('./users');
require('../authentication/initPassport');

routes.use('/v1/auth', auth);
routes.use('/v1/users', passport.authenticate('jwt', { session: false }), users);

routes.get('/', (req, res) => {
  res.json('Works');
});

routes.get('*', (req, res) => {
  res.status(404).json('Not found.');
});

module.exports = routes;
