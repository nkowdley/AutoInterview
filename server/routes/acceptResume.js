var express = require('express');
var router = express.Router();
//mongo stuffs
var mongoose = require('mongoose');
var db=mongoose.connection;
var applicant= require('../models/applicants.js');
/* Accept Post Request page. */
router.post('/', function(req, res, next) {
//create the person object from the post request
var person=new applicant(
{name: req.body.name,
song_name: req.body.resume
});

});

module.exports = router;
