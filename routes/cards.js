const router = require('express').Router();
const User = require('../models/User');
const Card = require('../models/Card');
// const Language = require('../models/Language');

router.get('/all/:userId', (req, res) => {
	// A virtual populate is used to attach cards with author
	// See User.js
	const findCards = User.findById(req.params.userId, '-password')
						.populate('cards')
						.exec(function(err, userWithCards) {
							if (err) return res.status(400).json(err)
							userWithCards ? (res.status(200).json(userWithCards.cards)) : (res.status(400).json({ error: 'User not found' }));
						});
});

router.get('/:id', (req, res) => {
	const findCard = Card.findById(req.params.id)
						.populate('author', 'username')
						.populate('language', 'name')
						.exec(function(err, card) {
							if (err) return res.status(400).json(err);
							return res.status(200).json(card);
						});
});

router.post('/', (req, res) => {
	const userId = '63575f97f10d3880bef08d81';
	const languageId = '63583d71c2d7e089364aede7';

	const findUser = User.findById(userId, function(err, user) {
		if (err) return res.status(400).json(err);

		if (user) {
			const newCard = new Card({ ...req.body, author: user._id, language: languageId })
			const newCardSave = newCard.save(function(err, card) {
				if (err) return res.status(400).json(err);
				return res.status(200).json(card);
			});
		} else {
			return res.status(400).json({ error: 'User id not found.' });
		}
	});
});

router.put('/:id', (req, res) => {
	const updatedData = req.body;
	const options = { new: true }; // Return modified document instead of original
	const updateCard = Card.findByIdAndUpdate(req.params.id, updatedData, options, function(err, card) {
		if (err) return res.status(400).json(err);
		card ? (res.status(200).json(card)) : (res.status(400).json({ error: 'Not updated because card not found.' }));
	})
});

router.delete('/:id', (req,res) => {
	const deleteCard = Card.findByIdAndDelete(req.params.id, function(err, card) {
		if (err) return res.status(400).json(err);
		card ? (res.status(200).json(card)) : res.status(400).json({ error: 'Card not deleted because not found.' });
	});
});

module.exports = router;