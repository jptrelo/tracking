// Mongoose to manage MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Fields
var TrackSchema = new Schema({
	user_id		: {type : Schema.Types.ObjectId, ref : 'User'},
	project_id  : {type : Schema.Types.ObjectId, ref : 'Project'},
	task_name	: String,	
	startedAt	: Date, // Avatar
	finishedAt	: {type: Date, default: Date.now},
	createdAt	: {type: Date, default: Date.now}
});

// Export this model
var Track = mongoose.model('Track', TrackSchema);