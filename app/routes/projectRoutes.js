var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
var projectController = require('../controllers/projectController');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/project') 
 .get(projectController.findAll)
 .post(projectController.add);
