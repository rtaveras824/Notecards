const router = require('express').Router();
const Language = require('../models/Language');

router.post('/', (req, res) => {
	const newLanguage = new Language(req.body);
	newLanguage.save(function(err, language) {
		if (err) return res.status(400).json(err);
		return res.status(200).json(language);
	});
});

module.exports = router;