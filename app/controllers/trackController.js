var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Track = mongoose.model('Track');

module.exports = function (app) {
  app.use('/', router);
};

//POST - Insert a new register
module.exports.add = function(req, res) {
    console.log('POST /track');
    console.log(req.body);
    Track.create({
      user_id   : req.user._id,
      project_id  : mongoose.Types.ObjectId(req.body.hdnProjectID),
      task_name : req.body.txtTask,
      startedAt : new Date(req.body.dateStarted),
      finishedAt  : new Date(req.body.dateFinished)
    }, 
    function (err, track) {
        if (err) return res.status(500).send("There was a problem adding the information to the database. " + err);
        res.status(200).jsonp(track);
    });
};

//GET - Return all registers
module.exports.findAll = function(req, res, next) {
    Track.find(function (err, tracks) {
        if (err) return res.status(500).send("There was a problem finding the track. " + err);
        console.log('GET /track');
        res.status(200).jsonp(tracks);
    }).populate('user_id').populate('project_id').sort({startedAt: -1});
};

//GET - Return a register with specified ID
module.exports.findById = function(req, res) {
    Track.findById(req.params.id, function(err, track) {
      if(err) return res.send(500, err.message);
      console.log('GET /track/' + req.params.id);
      res.status(200).jsonp(track);
    }).populate('user_id').populate('project_id');
};