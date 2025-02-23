var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var callbackRouter=require('./routes/callback/callback.routre')
var chargingController=require('./routes/Charging/charging.router')
var checkuser=require('./routes/checkUser/checkuser.router')
var redirectlogs=require('./routes/redirectlogs/redirectlogs.routes')
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: 'http://localhost:5173', // Allow this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'dist')));
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/callback-notify',callbackRouter);
app.use('/charging-callback',chargingController);
app.use('/checkuser',checkuser)
app.use('/redirectlogs',redirectlogs)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




