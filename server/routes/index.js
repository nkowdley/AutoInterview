var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("yolo");
  res.sendfile('../client/app/index.html');
});

module.exports = router;
