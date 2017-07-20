// Mongoose to manage MongoDB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Fields
var ProjectSchema = new Schema({
	user_id		: {type : Schema.Types.ObjectId, ref : 'User'},
	project_name : String,
	createdAt	: {type: Date, default: Date.now}
});

// Export this model
var Project = mongoose.model('Project', ProjectSchema);