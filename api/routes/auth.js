var express = require('express');
var router = express.Router();

/* Authentication */
router.get('/session', function(req, res, next) {
  res.send('hello from /session');
});

router.post('/login', function(req, res, next) {
  res.send('hello from /login');
});

router.post('/register', function(req, res, next) {
  // already has 
  res.send('hello from /register');
});

module.exports = router;