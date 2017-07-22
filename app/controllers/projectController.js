var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project');


module.exports = function (app) {
  app.use('/project', router);
};

//POST - Insert a new register
module.exports.add = function(req, res) {
    console.log('POST /project');
    console.log(req.body);
    Project.create({
    user_id   : req.user._id,
    name : req.body.txtProject
  }, 
  function (err, projects) {
      if (err) return res.status(500).send("There was a problem adding the information to the database. " + err);
      res.status(200).jsonp(projects);
  });
};

//GET - Return all registers
module.exports.findAll = function(req, res) {
    Project.find(function (err, projects) {
        if (err) return res.status(500).send("There was a problem finding the projects. " + err);
        console.log('GET /project');
        res.status(200).jsonp(projects);
    }).populate('user_id');
};

//GET - Return a register with specified ID
module.exports.findById = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
      if(err) return res.send(500, err.message);
      console.log('GET /project/' + req.params.id);
      res.status(200).jsonp(project);
    }).populate('user_id');
};