// Mongoose to manage MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Fields
var UserSchema = new Schema({
	name		: String,
	provider_id : {type: String, index: {unique: true}}, // Twitter ID
	photo		: String, // Avatar
	createdAt	: {type: Date, default: Date.now}
});

// Export this model
var User = mongoose.model('User', UserSchema);