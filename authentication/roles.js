const pool = require('../db/pool');

const getRoles = (callback) =>{
  pool.query('SELECT * FROM roles', (err, result) => {
    if (err) throw new Error(err);
    callback(null, result.rows);
  });
};

module.exports = {
  getRoles
};

