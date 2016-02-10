var User = require('../model/user');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var expressSession = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

exports.postUsers = function(req, res) {
    User.addUser(req.body);
    res.sendfile('public/login.html');
};

exports.getUsers = function(req, res) {
    res.sendfile('public/register.html');
};

exports.loginUser = function(req, res) {
    var username = User.getUser(req.body);
    if(username) {
        req.session.username = username;

        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
};

exports.login = function(req, res) {
    if(!req.session.username) {
        res.sendfile('public/login.html');
    }
    else {
        res.redirect('/');
    }
};

exports.logout = function(req, res) {
    delete req.session.username;
    res.redirect('/login');
};