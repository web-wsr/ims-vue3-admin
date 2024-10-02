// 引入dotenv模块
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const cors = require('./middlewares/cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 nunjucks
var nunjucks = require('nunjucks');


var adminRouter = require('./routes/admin/adminRouter');
var webRouter = require('./routes/web/webRouter');
var apiRouter = require('./routes/apiRouter')
// 引用filter
var filters = require('./filters/index')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'tpl');
nunjucks.configure('views', {
  autoescape: false,
  express: app,
  watch: true,
  noCache: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors.allowAll);


// 引用文件中引用 filters ，要在定义路由之前定义
filters(app)

// 后台系统路由 /api/admin
app.use('/api/admin', adminRouter)

// 企业官网路由 /api/web
app.use('/api/web', webRouter)

// api 路由
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
