const express = require('express');
const router = express.Router();
const { signIn, signUp, getSession } = require('../lib/supabase');

router.get('/', (req, res) => {
  res.send('hello from auth/');
});

router.get('/session', async (req, res, next) => {
  try {
    const token = req.query.access_token;
    const { data, error } = await getSession(token);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signIn(email, password);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signUp(email, password);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
