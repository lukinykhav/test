var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var jsonfile = require('jsonfile');
var util = require('util');
var expressSession = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));

app.use('/', routes);
app.use('/users', users);
//app.use('/login', login);

app.get('/register', function(req, res, next) {
  res.sendfile('public/register.html');
});

app.post('/register', function (req, res) {

  //var obj = '{"employees":[' +
  //    '{"firstName":"Jerry","lastName":"Negrell","time":"9:15 am","email":"jerry@bah.com","phone":"800-597-9405","image":"images/jerry.jpg" },' +
  //    '{"firstName":"Ed","lastName":"Snide","time":"9:00 am","email":"edward@bah.com","phone":"800-597-9406","image":"images/ed.jpg" },' +
  //    '{"firstName":"Pattabhi","lastName":"Nunn","time":"10:15 am","email":"pattabhi@bah.com","phone":"800-597-9407","image":"images/pattabhi.jpg" }'+
  //    ']}';
  var file = fs.readFileSync('public/data.json');
  var data = JSON.parse(file);  //parse the JSON

  for (var i = 0; i < data.employees.length; i++){
    if (data.employees[i].email == req.body.email){
      var email_exist = true;
    }
    else {
      var email_exist = false;
    }
  }
  if (!email_exist) {
    data.employees.push(req.body);
    jsonfile.writeFile('public/data.json', data, function(err) {
      console.error(err)
    });
    res.send(data);
  }

});

app.get('/login', function (req, res) {
  res.sendfile('public/login.html');
});

app.post('/login', function(req, res) {
  var file = fs.readFileSync('public/data.json');
  var data = JSON.parse(file);  //parse the JSON

  for (var i = 0; i < data.employees.length; i++){
    if (data.employees[i].email == req.body.email && data.employees[i].hash == req.body.hash){
      req.session.username = data.employees[i].username;
      res.redirect('/');
    }
  }
  res.send(req.session.username);
});

//function findUser(email, hash) {
//  if(hash != null) {
//    console.log(hash);
//  }
//}

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
