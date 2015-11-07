var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db=mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
//dump all jobs
  db.collection('jobslists').find().toArray(function(err, jobs){
    if (err)
    {
      console.log("Error:(err)");
      return next(err);
    }
    var testJobs={"jobs":jobs};
    var testData={data:testJobs};
    res.send(testData);
  });

});

module.exports = router;
