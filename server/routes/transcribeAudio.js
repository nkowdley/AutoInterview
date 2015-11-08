var express = require('express');
var router = express.Router();
//mongo
var mongoose = require('mongoose');
var db=mongoose.connection;
var https= require('https');
var accountSid = 'ACadbf6e101408ffbc1c22481542ca1f5a';
var authToken = '55e7a5b6e63fdad33b5b146dbceace84';
var client = require('twilio')(accountSid, authToken);


/* Post home page. */
router.get('/', function(req, res, next) {
  //find the applicants recording sid.
  db.collection('applicants').findOne({name:req.query['name']},function(err, phone){
    if (err)
    {
      console.log("Error:(err)");
      return next(err);
    }
    var sid=phone.audio;
    console.log(sid);
    var options = {
      host: 'api.twilio.com',
      port: 443,
      path: '/2010-04-01/Accounts/' + accountSid + '/Recordings/'+ sid  + '.mp3',
      method: 'GET',
      auth: sid + ":" + authToken,
      agent: false
    };

    var req = https.request(options, function(res) {
      res.setEncoding('binary');
      var mp3data = '';
      res.on('data', function (chunk) {
        mp3data += chunk;
        console.log(mp3data);
      });

      //transcribe interview
      // fs.createReadStream('audio_16k16bit.pcm').pipe(request.post({
      //     url: "https://dictation.nuancemobility.net:443/NMDPAsrCmdServlet/dictation?appId=NMDPTRIAL_nsk15_pitt_edu20151107171118&appKey=edbb32257df73364573079ee7a44ac165024918a7bb39879f0e79d85179272044ea529cb9c5c2ff38da8e207ed8e1d3db2aec72e615fa7514744d65ed7496225&id=C4461956B60B",
      //     headers: { 'Content-Type': 'audio/x-wav;codec=pcm;bit=16;rate=16000',
      //                 'Accept-Language' : 'EN-US',
      //                 'Accept' : 'text/plain',
      //                 'Accept-Topic':'Dictation'
      //     },
      //   }, function(error, response, body){
      //     if(error)
      //     {
      //       console.log(error);
      //       return next(error);
      //     }
      //     console.log(response.body);
      //   })
      // );
    });



  });
});

module.exports = router;
