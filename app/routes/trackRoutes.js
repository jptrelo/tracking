var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
var trackController = require('../controllers/trackController');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/track') 
 .get(trackController.findAll)
 .post(trackController.add);
