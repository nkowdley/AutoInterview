var express = require('express');
var router = express.Router();
//mongo
var mongoose = require('mongoose');
var db=mongoose.connection;
var fs = require('fs');
var PythonShell=require('python-shell');

/* Post home page. */
router.post('/', function(req, res, next) {

  var query = {'name':req.body.name};
  db.collection('applicants').findOneAndUpdate(query, {$push: {jobsapplied: req.body.job}}, {upsert:true}, function(err, doc){
    if (err)
    {
      return res.send(500, { error: err });
    }
  });

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

//push the name onto the array
  query={'jobname':req.body.job};

  db.collection('jobslists').findOneAndUpdate(query, {$push: {applicants: {name:req.body.name, score:'1'}}}, {upsert:false}, function(err, doc){
    if (err)
    {
      return res.send(500, { error: err });
    }
  });
  //push the persons score onto the array
  //var obj = JSON.parse(fs.readFileSync('file', 'utf8'));
  // db.collection('jobslists').findOneAndUpdate(query, {$push: {applicantsscore: '1'}}, {upsert:true}, function(err, doc){
  //   if (err)
  //   {
  //     return res.send(500, { error: err });
  //   }
  // });
  console.log("dbs updated");
  res.send("cool");

});

module.exports = router;
