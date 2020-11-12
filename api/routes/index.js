var express = require('express');
var router = express.Router();

const DB = require('../db/dbAssets')


/* GET ROUTES */

router.get('/', function(req, res, next) {
  res.send('Hey! Quit snooping. Go away and mind your own business!')
});

router.get('/client/:id', function(req, res, next) {
  DB.client.model.find({_id: req.params.id}, function(err, response){
    if(err){
      console.log(err)
    } else{
      res.json(JSON.stringify(response))
    }
  })
});

router.get('/inspection/:id', function(req, res, next) {
  DB.inspection.model.find({_id: req.params.id}, function(err, response){
    if(err){
      console.log(err)
      res.status(500).send()
    } else{
      console.log(response)
      res.status(200).json(JSON.stringify(response))
    }
  })
});

router.get('/recent-clients', function(req, res, next) {
  DB.client.model.find({client_status: "active"})
    .sort("-last_modified")
    .limit(10)
    .exec(function(err, response) {
        // console.log(response)
        res.status(200).json(JSON.stringify(response));
  })
});

router.get('/archived-clients', function(req, res, next) {
  DB.client.model.find({client_status: "archived"})
    .exec(function(err, response) {
        // console.log(response)
        res.status(200).json(JSON.stringify(response));
  })
});

router.get('/search-for-client', function(req, res, next) { 
  if (req.query.client_search) {
    const regex = new RegExp(escapeRegex(req.query.client_search), 'gi');

    DB.client.model.find({ "business_name": regex }, function(err, foundclients) {
        if(err) {
            console.log(err);
        } else {
          if(!foundclients.length){
            DB.client.model.find({ "contact_name": regex }, function(err, foundclients2) {
              if(err) {
                  console.log(err);
              } else {
                if(!foundclients2.length){
                  res.send('no such client exists');
                } else {
                  res.json(JSON.stringify(foundclients2));
                }
              }
          }); 
          } else {
            res.json(JSON.stringify(foundclients));
          }
        }
    }); 
  } else {
    res.send('query failed')
  }
});

router.get('/scheduled-inspections', function(req, res, next) {
  DB.inspection.model.find({status: "scheduled_inspection"})
    .sort("overview.inspection_date")
    .limit(20)
    .exec(function(err, response) {
        // console.log(response)
        res.status(200).json(JSON.stringify(response));
  })
});

router.get('/recent-inspections', function(req, res, next) {
  DB.inspection.model.find({status: ["active_inspection", "completed_inspection"]})
    .sort("-overview.inspection_date")
    .limit(20)
    .exec(function(err, response) {
        // console.log(response)
        res.status(200).json(JSON.stringify(response));
  })
});

/* POST ROUTES */
router.post('/new-client', function(req, res, next) {
  DB.client.new(req.body)
  res.send('new client added')
});

router.post('/new-inspection', function(req, res, next) {
  DB.inspection.new(req.body)
  res.send('new inspection added')
});


/* PUT ROUTES */
router.put('/inspection/:id', function(req, res, next) {
    let id = req.params.id
    console.log(id)
    let bodyData = req.body
    console.log("body", req.body)

    DB.inspection.model.findOneAndUpdate({_id: id}, {$set: bodyData}, function(err, updateData){
      if(err){
        console.log(err)
        res.status(500).send('update failed')
      } else {
        console.log(Object.keys(updateData))
        res.status(200).json(updateData)
      }
    })
  })
//     DB.inspection.model.findById(id, function(err, data){
// });

router.put('/client-all', function(req, res, next) {
  DB.client.model.updateMany({client_status: 'Active'}, {client_status: 'active'}, function(err){
    if(err){
      console.log(err)
      return res.status(500).send("delete inspection: failure");
    } else {
      return res.status(200).send("delete inspection: success");
    }
  });
});

router.put('/client/:id', function(req, res, next) {
  DB.client.update(req.params.id, req.body)
  res.send('client updated')
});

/* DELETE ROUTES */
router.delete('/inspection/:id', function(req, res, next) {
  DB.inspection.model.findOneAndDelete({_id: req.params.id}, function(err){
    if(err){
      console.log(err)
      return res.status(500).send("delete inspection: failure");
    } else {
      return res.status(200).send("delete inspection: success");
    }
  });
});

router.delete('/client/:id', function(req, res, next) {
  DB.client.model.findOneAndUpdate({_id: req.params.id}, {client_status: 'archived', last_modified: new Date()}, function(err){
    if(err){
      console.log(err)
      return res.status(500).send("delete client: failure");
    } else {
      return res.status(200).send("delete client: success");
    }
  });
});


module.exports = router;

/* HELPER FUNCTIONS */
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};