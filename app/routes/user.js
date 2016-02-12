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
    var user = false;
    if (fs.existsSync('public/data.json')) {
        var file = fs.readFileSync('public/data.json');
        var data = JSON.parse(file);  //parse the JSON
        user = User.getUser(req.body);
    }
    else {
        var data = {};
    }
    if(!user){
        User.addUser(data, req.body);
        res.send(true);
    }
    else {
        res.send(false);
    }
};

exports.loginUser = function(req, res) {
    var username = User.getUser(req.body);
    if(username) {
        res.send(req.session.username = username);
    }
    else {
        res.send('ssddad');
    }
};

exports.logout = function(req, res) {
    delete req.session.username;
};