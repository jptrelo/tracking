var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project');


module.exports = function (app) {
  app.use('/', router);
};

// Create a new project
router.post('/project/', function (req, res, next) {
  Project.create({
    user_id   : req.user._id,
    name : req.body.txtProject
  }, 
  function (err, projects) {
      if (err) return res.status(500).send("There was a problem adding the information to the database. " + err);
      res.status(200).send(projects);
  });

});

// Return all the projects
router.get('/project/', function (req, res, next) {
    Project.find().populate('user_id').exec(function (err, projects) {
        if (err) return res.status(500).send("There was a problem finding the projects. " + err);
        res.status(200).send(projects);
    });
});