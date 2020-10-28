var express = require('express');
var router = express.Router();

const dbWrite = require('../db/dbPostRequests')
const dbRead = require('../db/dbGetRequests')
const Client = require('../db/models/clientModel')





/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world!')
});

router.get('/recent-clients', function(req, res, next) {
  Client.model.find()
    .sort("-last_modified")
    .limit(10)
    .exec(function(err, response) {
        console.log(response)
        res.json(JSON.stringify(response));
  })
  
  // Client.model.find({last_modified: { $lte : Date.now() }}, function(err, response) {
  //   console.log(response)
  //   res.json(JSON.stringify(response));
  // })

});

router.get('/search-for-client', function(req, res, next) { 
  if (req.query.client_search) {
    const regex = new RegExp(escapeRegex(req.query.client_search), 'gi');

    Client.model.find({ "business_name": regex }, function(err, foundclients) {
        if(err) {
            console.log(err);
        } else {
          if(!foundclients.length){
            Client.model.find({ "contact_name": regex }, function(err, foundclients2) {
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


router.post('/new-client', function(req, res, next) {
  dbWrite.client.new(req.body)
  res.json('Test Saved')
});

router.post('/new-inspection', function(req, res, next) {
  dbWrite.inspection.new(req.body)
  res.json('Test Saved')
});

module.exports = router;


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};