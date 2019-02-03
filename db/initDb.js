const pool = require('./pool');
const path = require('path');
const fs = require('fs');

const initTables = fs.readFileSync(path.resolve(__dirname, './queries/initTables.sql')).toString();

function initDb () {
  return new Promise((resolve, reject) => {
    pool.query(initTables, (error, results) => {
      if (error) {
        console.error(error);
        reject(`Error with connection to DB ${error}`);
      }
      resolve('DB is connected.');
    });
  });
}

module.exports = initDb;
