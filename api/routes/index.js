var express = require('express');
var router = express.Router();
require('../db/mongodbConnection')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world!')
});

module.exports = router;
