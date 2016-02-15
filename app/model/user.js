var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.UserModel = function(username, email, hash, data) {
    this.username = username;
    this.email = email;
    this.hash = hash;
    this.data = data;

    this.addUser = function() {
        this.data[this.email] = '{"name": "' + this.username + '", "hash":"' + this.hash + '"}';
        fs.writeFile('public/data.json', JSON.stringify(this.data));
        return true;
    };

    this.getUser = function() {
        var file = fs.readFileSync('public/data.json');
        var data = JSON.parse(file);  //parse the JSON
        for (var user in data) {
            data[user] = JSON.parse(data[user]);
            if(user == this.email && data[user].hash == this.hash) {
                return data[user].name;
            }
        }
        return false;
    };
};

module.exports = app;