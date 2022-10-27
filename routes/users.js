const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
});

router.get('/:id', (req, res) => {
	// Show user information except password
	const findUser = User.findById(req.params.id, '-password', function(err, user) {
		if (err) return res.status(400).json(err);
		user ? (res.status(200).json(user)) : (res.status(400).json({ error: 'User not found.'}));
	});
});

router.post('/', (req, res) => {
	// Password encryption is handled in 'pre' hook in user schema
	const newUser = new User(req.body);
	const newUserSave = newUser.save(function(err, user) {
		if (err) return res.status(400).json(err);
		return res.status(200).json(user);
	});
});

router.put('/:id', (req, res) => {
	const updatedData = req.body;
	const options = { new: true }; // Return modified document instead of original
	const updateUser = User.findByIdAndUpdate(req.params.id, updatedData, options, function(err, user) {
		if (err) return res.status(400).json(err);
		user ? (res.status(200).json(user)) : (res.status(400).json({ error: 'Could not update because user not found.' }));
	});
});

router.delete('/:id', (req, res) => {
	const deletedUser = User.findByIdAndDelete(req.params.id, function(err, user) {
		if (err) return res.status(400).json(err);
		user ? (res.status(200).json(user)) : (res.status(400).json({ error: 'Could not delete because user not found.' }));
	});
});

module.exports = router;