var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const https = require('https');
var cors = require('cors');

//middlewares
// var indexMiddleware = require('./middlewares/index');

//routers
var statusRouter = require('./routes/Status');
var apiRouter = require('./routes/Api');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname +'/client/build'));
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

//routes
app.use('/status', cors(), statusRouter);
app.use('/api', apiRouter);
app.use('*', indexRouter);

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

  setInterval(() => {
    if (process.env.KEEP_ALIVE === 'true') {
      url = process.env.KEEP_ALIVE_URL;
        
      if (url.includes('https://')) {
        https.get(url);
      } else if(url.includes('http://')) {
        http.get(url);
      }

      console.log('Keep alive processed');
    }
  }, process.env.KEEP_ALIVE_INTERVAL);

module.exports = app;
