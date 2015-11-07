var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db=mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
//dump all jobs
  db.collection('jobslists').findOne({company:req.query['company']}).toArray(function(err, jobs){
    if (err)
    {
      console.log("Error:(err)");
      return next(err);
    }
    res.send(jobs);
  });

});

module.exports = router;
