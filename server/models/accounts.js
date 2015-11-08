var mongoose = require('mongoose');
//var app = express();
var schema = new mongoose.Schema({
  //schema setup
  name: String,
  phone: String,
  audio: String,
  resume: String
});

module.exports = mongoose.model('applicants', schema);
