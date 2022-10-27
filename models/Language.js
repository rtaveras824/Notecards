const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true, 
		unique: true
	}, 
	date_created: {
		type: Date, 
		default: Date.now
	}
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;