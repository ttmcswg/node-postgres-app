const app = require('./app');
const initDb = require('./db/initDb');

const port = 5000;

initDb()
  .then(result => console.log(result))
  .catch(error => console.error(error));

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
