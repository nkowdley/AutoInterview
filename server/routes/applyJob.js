var express = require('express');
var router = express.Router();
//mongo
var mongoose = require('mongoose');
var db=mongoose.connection;

/* Post home page. */
router.post('/', function(req, res, next) {

  var query = {'name':req.body.name};
  db.collection('applicants').findOneAndUpdate(query, {$push: {jobsapplied: req.body.job}}, {upsert:true}, function(err, doc){
    if (err)
    {
      return res.send(500, { error: err });
    }
  });
  console.log("db updated")
  //run the python script to analyze resumes
  //set options
  var options = {
    args: ['value1', 'value2', 'value3']
  };

  PythonShell.run('hello-world.py', //options,
  function (err) {
    if (err) throw err;
    console.log('python script ran successfully!');
  });

  res.send("Job Accepted!");
});

module.exports = router;
