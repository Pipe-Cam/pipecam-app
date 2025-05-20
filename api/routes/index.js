var express = require('express');
var router = express.Router();

const DB = require('../db/dbAssets');

/* GET ROUTES */
router.get('/', function (req, res) {
  res.send('Hey! Quit snooping. Go away and mind your own business!');
});

router.get('/client/:id', async function (req, res) {
  try {
    const data = await DB.client.getById(req.params.id);
    res.json(data || {});
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/inspection/:id', async function (req, res) {
  try {
    const data = await DB.inspection.getById(req.params.id);
    res.status(200).json(data || {});
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/recent-clients', async function (req, res) {
  try {
    const data = await DB.client.getRecent();
    res.status(200).json(data || []);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/archived-clients', async function (req, res) {
  try {
    const data = await DB.client.getArchived();
    res.status(200).json(data || []);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/search-for-client', async function (req, res) {
  if (!req.query.client_search) {
    return res.send('query failed');
  }
  try {
    const data = await DB.client.search(req.query.client_search);
    if (!data || data.length === 0) {
      res.send('no such client exists');
    } else {
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/scheduled-inspections', async function (req, res) {
  try {
    const data = await DB.inspection.getScheduled();
    res.status(200).json(data || []);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/recent-inspections', async function (req, res) {
  try {
    const data = await DB.inspection.getRecent();
    res.status(200).json(data || []);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

/* POST ROUTES */
router.post('/new-client', async function (req, res) {
  await DB.client.new(req.body);
  res.send('new client added');
});

router.post('/new-inspection', async function (req, res) {
  await DB.inspection.new(req.body);
  res.send('new inspection added');
});

/* PUT ROUTES */
router.put('/inspection/:id', async function (req, res) {
  try {
    const data = await DB.inspection.update(req.params.id, req.body);
    res.status(200).json(data || {});
  } catch (err) {
    console.log(err);
    res.status(500).send('update failed');
  }
});

router.put('/client-all', async function (req, res) {
  try {
    await DB.client.bulkActivate();
    res.status(200).send('delete inspection: success');
  } catch (err) {
    console.log(err);
    res.status(500).send('delete inspection: failure');
  }
});

router.put('/client/:id', async function (req, res) {
  await DB.client.update(req.params.id, req.body);
  res.send('client updated');
});

/* DELETE ROUTES */
router.delete('/inspection/:id', async function (req, res) {
  try {
    await DB.inspection.delete(req.params.id);
    res.status(200).send('delete inspection: success');
  } catch (err) {
    console.log(err);
    res.status(500).send('delete inspection: failure');
  }
});

router.delete('/client/:id', async function (req, res) {
  try {
    await DB.client.archive(req.params.id);
    res.status(200).send('delete client: success');
  } catch (err) {
    console.log(err);
    res.status(500).send('delete client: failure');
  }
});

module.exports = router;
