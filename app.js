var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", "/views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// connect to mongo atlas
const { USERNAME, PASSWORD, DATABASE } = process.env;
if (!(USERNAME && PASSWORD && DATABASE)) return process.exit(1);

mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@restapi-jwt-kpxei.gcp.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(error => createError({ ...error, status: 404 }));

app.use("/", (req, res, next) => {
  return res.status(200).json({ message: "success" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ err });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
