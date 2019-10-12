const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

require('./config/passport');

const app = express();

// view engine setup
app.set('views', '/views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

const PORT = process.env.PORT || 5000;

// connect to mongo atlas
const { USER, PASSWORD, DATABASE } = process.env;
if (!(USER && PASSWORD && DATABASE)) return process.exit(1);

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}` +
    '@restapi-jwt-kpxei.gcp.mongodb.net/' +
    `${DATABASE}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(error => {
    throw new Error(error);
  });

// use passport
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
