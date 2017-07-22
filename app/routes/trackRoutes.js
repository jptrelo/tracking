var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
var TrackController = require('../controllers/trackController');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/track') 
 .get(TrackController.findAll)
 .post(TrackController.add);
