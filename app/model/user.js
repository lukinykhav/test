var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

exports.addUser = function(data, req) {
    data[req.email] = '{"name": "' + req.username + '", "hash":"' + req.hash + '"}';
    fs.writeFile('public/data.json', JSON.stringify(data));
    return true;
};

exports.getUser = function(req) {
    var file = fs.readFileSync('public/data.json');
    var data = JSON.parse(file);  //parse the JSON
    for (var user in data) {
        data[user] = JSON.parse(data[user]);
        if(user == req.email) {
            return data[user].name;
        }
    }
    return false;
};
