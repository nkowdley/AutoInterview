var express = require('express');
var router = express.Router();
var multer= require('multer');
//mongo stuffs
var mongoose = require('mongoose');
var db=mongoose.connection;
var applicant= require('../models/applicants.js');

//run swaroops script
var PythonShell = require('python-shell');

/* Accept Post Request page. */
router.post('/',[ multer({ dest: './uploads/'}), function(req, res, next) {
//create the person object from the post request
var person=new applicant(
{name: req.body.name,
resume: req.files.resume.path
});
//save the items in the db
person.save(function (err, person) {
  if (err) return console.error(err);
});

//res.send(req.files);
//var options = {
//  args: ['value1', 'value2', 'value3']
//};

PythonShell.run('hello-world.py', //options,
function (err) {
  if (err) throw err;
  console.log('python ran successfully!');
});

}]);

module.exports = router;
