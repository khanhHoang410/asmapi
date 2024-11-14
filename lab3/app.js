var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const database = require("./config/db");
var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
var apiRouter = require("../lab3/routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

database.connect();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const atlat =
  "mongodb+srv://<db_username>:<db_password>@monggodbslide2.jooka.mongodb.net/myDB?retryWrites=true&w=majority&appName=monggodbslide2";

const connect = async () => {
  try {
    await mongoose.connect(atlat, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect success");
  } catch (error) {
    console.log("Connect fail");
    console.log(error);
  }
};
