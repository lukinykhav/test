var User = require('../model/user');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var expressSession = require('express-session');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

exports.postUsers = function(req, res) {
    var user,
        search_user = false,
        data = {};
    if (fs.existsSync('public/data.json')) {
        var file = fs.readFileSync('public/data.json');
        data = JSON.parse(file);  //parse the JSON
        user = new User.UserModel(req.body.username, req.body.email, req.body.hash, data);
        search_user = user.getUser();
    }
    if(!search_user){
        user = new User.UserModel(req.body.username, req.body.email, req.body.hash, data);
        user.addUser();
        res.send(true);
    }
    else {
        res.send(false);
    }
};

exports.loginUser = function(req, res) {
    var user = new User.UserModel(req.body.username, req.body.email, req.body.hash);
    var username = user.getUser();
    if(username) {
        res.send(req.session.username = username);
    }
    else {
        res.send(false);
    }
};

exports.logout = function(req, res) {
    delete req.session.username;
};