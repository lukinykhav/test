var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send(req.session.username);
  res.render('index', { username: req.session.username });
});

module.exports = router;
