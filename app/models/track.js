// Mongoose to manage MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Fields
var TrackSchema = new Schema({
	name		: String,
	provider_id : {type: String, unique: true}, // Twitter ID
	photo		: String, // Avatar
	createdAt	: {type: Date, default: Date.now}
});

// Export this model
var Track = mongoose.model('Track', TrackSchema);