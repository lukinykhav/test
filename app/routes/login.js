var express = require('express');
var router = express.Router();

router.use(express.static('public'));
router.use(express.static('images'));

router.get('/login', function(req, res, next) {
  res.sendfile('public/login.html');
});

router.post('/', function (req, res) {
  var html = 'Hello: ' + req.body.username + '.<br>' +
        '<a href="/">Try again.</a>';
  res.send(html);
});

module.exports = router;