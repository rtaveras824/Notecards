const router = require('express').Router();
const UserSchema = require('../models/User');

// Get user info by username
// Post user info
// Update user info
// Delete user info

router.get('/:id', (req, res) => {
	res.json({
		id: req.params.id, 
		message: 'Get'
	});
});

router.post('/', (req, res) => {
	res.json({
		message: 'Post'
	});
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