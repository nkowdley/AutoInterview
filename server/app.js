/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';
import http from 'http';
import multer from 'multer';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/interview', function(err) {
  if(err) {
    console.log('MONGO CONNECTION ERROR', err);
  } else {
    console.log('MONGO CONNECTION SUCCESSFUL');
  }
});

//make db connection
var db=mongoose.connection;
// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

//handle file uploads
app.use(multer({ dest: './uploads/'}))

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
