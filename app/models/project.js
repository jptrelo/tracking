// Mongoose to manage MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Fields
var ProjectSchema = new Schema({
	user_id		: {type : Schema.Types.ObjectId, ref : 'User'},
	name 		: {type: String, required: true},
	createdAt	: {type: Date, default: Date.now}
});

// Export this model
var Project = mongoose.model('Project', ProjectSchema);