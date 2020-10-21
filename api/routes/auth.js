var express = require('express');
var router = express.Router();

/* Authentication */
router.get('/', function(req, res, next) {
  res.send('hello from auth/');
});

router.get('/session', function(req, res, next) {
  res.send('hello from auth/session');
});

router.post('/login', function(req, res, next) {
  res.send('hello from auth/login');
});

router.post('/register', function(req, res, next) {
  // already has 
  res.send('hello from auth/register');
});


module.exports = router;