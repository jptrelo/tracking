var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Track = mongoose.model('Track');


module.exports = function (app) {
  app.use('/', router);
};

// Create a new Track
router.post('/track/', function (req, res, next) {
  Track.create({
    user_id		: req.user._id,
	project_id  : req.body.txtProject,
	task_name	: req.body.txtTask,
	startedAt	: req.body.dateStarted,
	finishedAt	: req.body.dateFinished
  }, 
  function (err, track) {
      if (err) return res.status(500).send("There was a problem adding the information to the database. " + err);
      res.status(200).send(track);
  });

});

// Return all the Track
router.get('/track/', function (req, res, next) {
    Track.find().populate('user_id').populate('project_id').exec(function (err, tracks) {
        if (err) return res.status(500).send("There was a problem finding the track. " + err);
        res.status(200).send(tracks);
    });
});