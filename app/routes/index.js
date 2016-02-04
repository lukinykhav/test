var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (localStorage.length !== 0) {
    res.render('index', { username: localStorage.getItem('username') });
  }
  else if (req.session.username) {
    res.render('index', { username: req.session.username });
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;
