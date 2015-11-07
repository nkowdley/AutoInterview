var mongoose = require('mongoose');
//var app = express();
var schema = new mongoose.Schema({
  //schema setup
  jobname: String,
  company: String,
  jobdetails: String,
  applicants: [],
  applicantsscore: []
});

module.exports = mongoose.model('jobslist', schema);
