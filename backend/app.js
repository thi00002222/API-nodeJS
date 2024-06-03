var createError = require('http-errors');
var express = require('express');
var expressLayout = require('express-ejs-layouts')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adSPRouter = require('./routes/adSP');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/adUser');
var adCateRouter = require('./routes/adCate');
var adOrderRouter = require('./routes/adOrders');

var app = express();
app.use((req,res,next)=>{
  res.setHeader ('Access-Control-Allow-Origin','*')
  res.setHeader ('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader ('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})
// view engine setup
app.use(expressLayout);
app.set('layout', 'layouts')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/sp', adSPRouter);
app.use('/admin/cate', adCateRouter);
app.use('/admin/order', adOrderRouter);

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
