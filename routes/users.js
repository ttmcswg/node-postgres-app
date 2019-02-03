const users = require('express').Router();
const usersController = require('../controllers/usersController');

users.get('/', usersController.getUsers);
users.post('/', usersController.createUser);
users.get('/:id', usersController.getUser);

module.exports = users;
