var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var jsonfile = require('jsonfile');
var expressSession = require('express-session');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));

app.use('/', routes);

app.get('/register', function(req, res, next) {
  res.sendfile('public/register.html');
});

app.post('/register', function (req, res) {
  var email_exist = false;
  if (fs.existsSync('public/data.json')) {
    var file = fs.readFileSync('public/data.json');
    var data = JSON.parse(file);  //parse the JSON

    for (var i = 0; i < data.users.length; i++){
      if (data.users[i].email == req.body.email){
        email_exist = true;
      }
    }
    if (!email_exist) {
      data.users.push(req.body);
      jsonfile.writeFile('public/data.json', data, function(err) {
        console.error(err)
      });
      res.redirect('/login');
    }
    else {
      res.send('This email is exist');
    }
  }
  else {
    var obj = '{"users":[' +
        '{"username":"' + req.body.username + '","email":"' + req.body.email + '","hash":"' + req.body.hash + '"}' +
        ']}';
    fs.writeFile('public/data.json', obj);
    res.redirect('/login');
  }

});

app.get('/login', function (req, res) {
  res.sendfile('public/login.html');
});

app.post('/login', function(req, res) {
  if (fs.existsSync('public/data.json')) {
    var file = fs.readFileSync('public/data.json');
    var data = JSON.parse(file);  //parse the JSON

    for (var i = 0; i < data.users.length; i++){
      if (data.users[i].email == req.body.email && data.users[i].hash == req.body.hash){
        if(req.body.remember == 'on') {
          localStorage.setItem('email', data.users[i].email);
          localStorage.setItem('password', data.users[i].hash);
          localStorage.setItem('username', data.users[i].username);
        }
        else {
          req.session.username = data.users[i].username;
        }
        res.redirect('/');
      }
    }
    res.redirect('/login');
  }
  else {
    res.redirect('/register');
  }
});

app.get('/logout', function (req, res) {
  localStorage.clear();
  delete req.session.username;
  res.redirect('/login');
});

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
