var express = require('express');
var router = express.Router();

router.use(express.static('public'));
router.use(express.static('images'));

router.get('/', function(req, res, next) {
  res.send('login');
});

module.exports = router;