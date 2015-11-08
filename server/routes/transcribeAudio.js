var express = require('express');
var router = express.Router();
//mongo
var mongoose = require('mongoose');
var db=mongoose.connection;
var https= require('https');
var request=require('request');
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
    var recording1;
    var sid=phone.audio;
    client.recordings.list(function(err, data) {
      data.recordings.forEach(function(recording) {
        //console.log(recording);
        if (recording.call_sid==sid)
        {
          recording1=recording.sid;
          console.log(recording1);
          // var options = {
          //   host: 'api.twilio.com',
          //   port: 443,
          //   path: 'api.twilio.com'+'/2010-04-01/Accounts/' + accountSid + '/Recordings/'+ recording1  + '.mp3',
          //   method: 'GET',
          //   auth: sid + ":" + authToken,
          //   agent: false
          // };
          var url='api.twilio.com'+'/2010-04-01/Accounts/' + accountSid + '/Recordings/'+ recording1  + '.mp3';
          console.log(url);
          request.get({
            url: 'api.twilio.com'+'/2010-04-01/Accounts/' + accountSid + '/Recordings/'+ recording1  + '.mp3',
            method: 'GET',

          },function(error, response, body){
            if(error)
            {
              console.log(error);
              return next(error);
            }
            console.log(body);
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
        };

      }
    );
  });
});




});
module.exports = router;
