const { handleDbRequest } = require('../utils/helper');

const getUsers = (req, res) => {
  return handleDbRequest(req, res, 'SELECT * FROM users');
};

const getUser = (req, res) => {
  const { id } = req.params;

  return handleDbRequest(req, res, `SELECT * FROM users WHERE user_id =${id}`);
};


const createUser = (req, res) => {
  const { username, password } = req.body;

  return handleDbRequest(req, res, `INSERT INTO users (user_name, user_password) VALUES (${username}, ${password})`);
};

module.exports = {
  getUsers,
  getUser,
  createUser
};
