const users = require('express').Router();
const passport = require('passport');

const usersController = require('../controllers/usersController');

users.get('/', passport.authenticate('jwt', { session: false }), usersController.getUsers);
users.post('/', usersController.createUser);
users.get('/:id', passport.authenticate('jwt', { session: false }), usersController.getUser);

module.exports = users;
