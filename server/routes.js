/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/acceptResume', require('./views/acceptResume')); //acceptResume Sent to us
  app.use('/getJobs', require('./views/getJobs')); //get a list of all Jobs we have in the db
  app.use('/acceptJobs', require('./views/acceptJobs')); //allow employers to add jobss
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
