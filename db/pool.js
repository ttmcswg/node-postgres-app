const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'testDb',
  port: 5433
});

module.exports = pool;
