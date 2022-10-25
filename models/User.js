const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String, 
		required: [true, 'Must have a username.'],
		unique: true,
		minLength: [3, 'Username must contain at least 3 characters'],
	}, 
	email: {
		type: String, 
		required: [true, 'Must have an email.'],
		validate: {
			validator: function(v) {
				return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
			}, 
			message: 'Not a valid email'
		}
	}, 
	password: {
		type: String,
		required: [true, 'Must have a password']
	}, 
	profile_pic_url: {
		type: String,
		default: null
	}, 
	date_created: {
		type: Date, 
		default: Date.now
	}
});

userSchema.methods.newEntry = function newEntry() {
	console.log("New user " + this.username + " was added on " + this.date_created + ".");
};

// Hash password for security before entering into database
userSchema.pre('save', function(next) {
	const saltRounds = 10;
	bcrypt.hash(this.password, saltRounds, (err, hash) => {
		if (err) return err;
		this.password = hash;
		next();
	});
});

const User = mongoose.model('User', userSchema);

module.exports = User;