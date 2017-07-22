var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
var ProjectController = require('../controllers/projectController');

module.exports = function (app) {
  app.use('/', router);
};

router.route('/project') 
 .get(ProjectController.findAll)
 .post(ProjectController.add);

router.route('/project/:id') 
 .get(ProjectController.findById);
