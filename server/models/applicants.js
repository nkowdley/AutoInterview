var mongoose = require('mongoose');
//var app = express();
var schema = new mongoose.Schema({
  //schema setup
  name: String,
  resume: String,
  audio: String,
  jobsapplied: []
});

module.exports = mongoose.model('applicants', schema);
