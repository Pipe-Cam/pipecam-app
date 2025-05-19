var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.send('Hey! Quit snooping. Go away and mind your own business!');
});

module.exports = router;
