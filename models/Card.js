const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
	word: {
		type: String, 
		required: true, 
	}, 
	description: {
		type: String,
	}, 
	example: {
		type: String, 
	}, 
	photo_url: {
		type: String, 
	}, 
	reference: {
		type: String, 
	}, 
	language: {
		type: Schema.Types.ObjectId, 
		ref: 'Language', 
	}, 
	author: {
		type: Schema.Types.ObjectId, 
		ref: 'User', 
		required: true, 
	}, 
	date_created: {
		type: Date,
		default: Date.now,
	}
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;