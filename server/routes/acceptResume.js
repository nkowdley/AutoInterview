var express = require('express');
var router = express.Router();
var multer= require('multer');
//mongo stuffs
var mongoose = require('mongoose');
var db=mongoose.connection;
var applicant= require('../models/applicants.js');
var fs= require('fs');

//run swaroops script
var PythonShell = require('python-shell');
var request = require('request');

/* Accept Post Request page. */
router.post('/',[ multer({ dest: './uploads/'}), function(req, res, next) {
//transcribe interview
fs.createReadStream('audio_16k16bit.pcm').pipe(request.post({
    url: "https://dictation.nuancemobility.net:443/NMDPAsrCmdServlet/dictation?appId=NMDPTRIAL_nsk15_pitt_edu20151107171118&appKey=edbb32257df73364573079ee7a44ac165024918a7bb39879f0e79d85179272044ea529cb9c5c2ff38da8e207ed8e1d3db2aec72e615fa7514744d65ed7496225&id=C4461956B60B",
    headers: { 'Content-Type': 'audio/x-wav;codec=pcm;bit=16;rate=16000',
                'Accept-Language' : 'EN-US',
                'Accept' : 'text/plain',
                'Accept-Topic':'Dictation'
    },
  }, function(error, response, body){
    if(error)
    {
      console.log(error);
      return next(error);
    }
    console.log(response.body);
  })
);

  //create the person object from the post request
  var person=new applicant(
    {name: req.body.name,
      resume: req.files.resume.path
    });

    //save the items in the db
    person.save(function (err, person) {
      if (err) return console.error(err);
    });
    res.send(req.files);


  }]);

  module.exports = router;
