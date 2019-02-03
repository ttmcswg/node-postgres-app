const pool = require('../db/pool');

const handleDbRequest = (req, res, query = '') => {
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (results && results.rows.length > 0) {
      return res.status(200).json(results.rows.length === 1 ? results.rows[0] : results.rows);
    }

    return res.status(200).json(results);
  });
};

module.exports = {
  handleDbRequest
};
