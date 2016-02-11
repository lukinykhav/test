var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var jsonfile = require('jsonfile');
var expressSession = require('express-session');

var router = express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));

// Load required packages
var user = require('./routes/user');

app.post('/signup', user.postUsers);

app.post('/signin', user.loginUser);

app.post('/logout', user.logout);

//app.post('/register', function (req, res) {
//  var email_exist = false;
//  if (fs.existsSync('public/data.json')) {
//    var file = fs.readFileSync('public/data.json');
//    var data = JSON.parse(file);  //parse the JSON
//
//    for (user in data) {
//      if(user == req.body.email) {
//        email_exist = true;
//      }
//    }
//    if (!email_exist) {
//      data[req.body.email] = '{"name": "' + req.body.username + '", "hash":"' + req.body.hash + '"}';
//      fs.writeFile('public/data.json', JSON.stringify(data), function(err) {
//        console.error(err)
//      });
//      res.redirect('/login');
//    }
//    else {
//      res.send('This email is exist');
//    }
//  }
//  else {
//    var obj = {};
//    obj[req.body.email] = '{"name": "' + req.body.username + '", "hash":"' + req.body.hash + '"}';
//    fs.writeFile('public/data.json', JSON.stringify(obj));
//    res.redirect('/login');
//  }
//});
//app.post('/login', function(req, res, next) {
//  if (fs.existsSync('public/data.json')) {
//    var file = fs.readFileSync('public/data.json');
//    var data = JSON.parse(file);
//    var username = searchUser(file, req.body.email, req.body.hash);
//    if (username) {
//      req.session.username = username;
//      res.redirect('/');
//    }
//    else {
//      res.redirect('/login');
//    }
//  }
//  else {
//    res.redirect('/register');
//  }
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


