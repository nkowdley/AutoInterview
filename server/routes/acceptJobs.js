var express = require('express');
var router = express.Router();
//mongo
var mongoose = require('mongoose');
var db=mongoose.connection;
var joblist= require('../models/jobslist.js');

/* Post home page. */
router.post('/', function(req, res, next) {

var job=new joblist(
{ jobname: req.body.jobname,
  company: req.body.company,
  jobdetails: req.body.jobdetails
});
//save the job to mongo
job.save(function (err, job) {
  if (err) return console.error(err);
});

res.send("Job Accepted!");
});

module.exports = router;
