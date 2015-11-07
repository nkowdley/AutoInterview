var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  db.collection('jobslist').find().toArray(function(err, jobs){
    if (err)
    {
      console.log("Error:(err)");
      return next(err);
    }
    res.send(jobs);
  });

});

module.exports = router;
