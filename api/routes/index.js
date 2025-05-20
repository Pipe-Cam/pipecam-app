var express = require('express');
const {
  createNewClient,
  createNewInspection,
  updateInspection,
  deleteInspection
} = require('../db/dbAssets');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.send('Hey! Quit snooping. Go away and mind your own business!');
});

// Create a new client
router.post('/clients', async function(req, res, next) {
  try {
    const client = await createNewClient(req.body);
    res.json(client);
  } catch (err) {
    next(err);
  }
});

// Create a new inspection
router.post('/inspections', async function(req, res, next) {
  try {
    const inspection = await createNewInspection(req.body);
    res.json(inspection);
  } catch (err) {
    next(err);
  }
});

router.put('/inspections/:id', async function(req, res, next) {
  try {
    const inspection = await updateInspection(req.params.id, req.body);
    res.json(inspection);
  } catch (err) {
    next(err);
  }
});

router.delete('/inspections/:id', async function(req, res, next) {
  try {
    await deleteInspection(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
