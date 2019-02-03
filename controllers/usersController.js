const bcrypt = require('bcryptjs');

const { handleDbRequest } = require('../utils/helper');
const { RequestError } = require('../errors/errors');
const pool = require('../db/pool');

const getUsers = (req, res) => {
  return handleDbRequest(req, res, 'SELECT * FROM users LEFT JOIN user_roles on users.user_id = user_roles.user_id');
};

const getUser = (req, res) => {
  const { id } = req.params;

  return handleDbRequest(req, res, `SELECT * FROM users LEFT JOIN user_roles on users.user_id = user_roles.user_id WHERE users.user_id=${id}`);
};

const updateUserPassword = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) throw new RequestError('Wrong fields.');

  return handleDbRequest(req, res, `UPDATE users SET user_password='${password}' WHERE user_id=${id}`);
};

const createUser = (req, res) => {
  const { username, password, role } = req.body;
  const saltRounds = 12;

  if (!(username && password && role)) throw new RequestError('Wrong fields.');

  bcrypt.hash(password, saltRounds)
    .then(hashedPassword => {
      pool.connect((err, client, done) => {
        const shouldAbort = (error) => {
          if (error) {
            client.query('ROLLBACK', (err) => {
              if (err) {
                console.error('Error rolling back client', err.stack);
              }
              done();
              res.status(400).json({ error: error.message ? error.message : error });
            });
          }

          return !!error;
        };

        client.query('BEGIN', (err) => {
          if (shouldAbort(err)) return;
          client.query(`INSERT INTO users (user_name, user_password) VALUES ('${username}', '${hashedPassword}') RETURNING user_id`, (err, result) => {
            if (shouldAbort(err)) return;
            const userId = result.rows[0].user_id;

            client.query(`INSERT INTO user_roles (role_id, user_id) VALUES (${role}, ${userId})`, (err, result) => {
              if (shouldAbort(err)) return;

              client.query('COMMIT', (err) => {
                if (err) {
                  console.error('Error committing transaction', err.stack);
                }
                done();
                res.json({ success: true, message: `User ${username} with id ${userId} is successfully created.` });
              });
            });
          });
        });
      });
    })
    .catch(error => {
      res.json({ error: error.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserPassword
};
