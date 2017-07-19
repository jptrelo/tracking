var mongoose = require('mongoose');
var User = mongoose.model('User');
var TwitterStrategy = require('passport-twitter').Strategy;
// File where we put the API keys
var api = require('./config/api');

module.exports = function(passport) {

	// Serialize user to save it in session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserialize user so we can use it
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	// Config Twitter auth 
	passport.use(new TwitterStrategy({
		consumerKey		 : api.twitter.key,
		consumerSecret	: api.twitter.secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// find if an user is in db
		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			// if is, return it
			if(!err && user!= null) return done(null, user);

			// otherwise, creates a new user
			var user = new User({
				provider_id	: profile.id,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			//...and save it in db
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));

};