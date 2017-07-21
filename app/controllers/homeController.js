var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Track = mongoose.model('Track');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

	var data = {
				title: 'Tracking by Qrvey',
		      	aTwitter : 'Login with Twitter',
		  		};
	if (req.user) { 
		Track.find(function (err, result) {
        	data.user = req.user;
		    data.tracks = result;

		    res.render('index', data);
    	}).populate('user_id').populate('project_id').sort({startedAt: -1});
	}else{
		res.render('index', data);
	}

});
