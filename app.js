const express = require('express');

//routes
const routes = require('./routes/index');

//middlewares
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandlingMiddleware } = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(passport.initialize());

app.use('/', routes);

app.use(errorHandlingMiddleware);

module.exports = app;


