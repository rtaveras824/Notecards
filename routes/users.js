const router = require('express').Router();
const User = require('../models/User');

// Get user info by username
// Post user info
// Update user info
// Delete user info

router.get('/:id', (req, res) => {
	// Show user information except password
	const findUser = User.findById(req.params.id, '-password', function(err, user) {
		if (err) res.json(err);
		res.json(user);
	});
});

router.post('/', async (req, res) => {
	// Password encryption is handled in 'pre' hook in user schema
	const newUser = new User(req.body);
	const newUserSave = await newUser.save();
	newUserSave.newEntry();
	res.json(newUserSave);
});

router.put('/:id', (req, res) => {
	res.json({
		id: req.params.id, 
		message: 'Update'
	});
});

router.delete('/:id', (req, res) => {
	res.json({
		id: req.params.id, 
		message: 'Delete'
	});
});

module.exports = router;