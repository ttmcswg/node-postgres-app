const users = require('express').Router();
const passport = require('passport');

const usersController = require('../controllers/usersController');
const { hasRole } = require('../middlewares').authenticationMiddleware;

users.get('/', passport.authenticate('jwt', { session: false }), hasRole([1, 2, 3]), usersController.getUsers);
users.post('/', usersController.createUser);
users.get('/:id', passport.authenticate('jwt', { session: false }), hasRole([1, 2, 3]), usersController.getUser);
users.put('/:id', passport.authenticate('jwt', { session: false }), hasRole([1]), usersController.updateUserPassword);

module.exports = users;
