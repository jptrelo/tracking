var mongoose = require('mongoose');
var User = mongoose.model('User');
// Estrategia de autenticación con Twitter
var TwitterStrategy = require('passport-twitter').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var api = require('./config/api');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function(passport) {

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	// Configuración del autenticado con Twitter
	passport.use(new TwitterStrategy({
		consumerKey		 : api.twitter.key,
		consumerSecret	: api.twitter.secret,
		callbackURL		 : '/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// Busca en la base de datos si el usuario ya se autenticó en otro
		// momento y ya está almacenado en ella
		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			// Si existe en la Base de Datos, lo devuelve
			if(!err && user!= null) return done(null, user);

			// Si no existe crea un nuevo objecto usuario
			var user = new User({
				provider_id	: profile.id,
				name				 : profile.displayName,
				photo				: profile.photos[0].value
			});
			//...y lo almacena en la base de datos
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));

};