var express = require('express');
var router = express.Router();
//mongo
var mongoose = require('mongoose');
var db=mongoose.connection;
var applicants= require('../models/applicants.js');

//twilio details
var accountSid = 'ACadbf6e101408ffbc1c22481542ca1f5a';
var authToken = '55e7a5b6e63fdad33b5b146dbceace84';
var client = require('twilio')(accountSid, authToken);

function call_phone(phone,name)
{
  console.log(phone);
  client.calls.create({
    to: phone,
    from: "+12407822105",
    url: "https://www.google.com",
    method: "GET",
    fallbackMethod: "GET",
    statusCallbackMethod: "GET",
    record: "true"
  }, function(err, call) {
    if(err){
      console.log(err);
    } else {
      console.log(call.sid);
      console.log(call);
    }
    console.log(name);
    var query = {'name':name};
    db.collection('applicants').findOneAndUpdate(query, {$set :{name:name, audio:call.sid}}, {upsert:false}, function(err, doc){
      if (err)
      {
        console.log(err);
      }
    });
  });
  console.log("cool");
  return "1";
}
/* Post home page. */
router.get('/', function(req, res, next) {
  console.log("hi");
  db.collection('applicants').findOne({name:req.query['name']},function(err, phone){
    if (err)
    {
      console.log("Error:(err)");
      return next(err);
    }
    console.log.p
  res.send(call_phone(phone.phone,req.query['name']));
  });
});

module.exports = router;
