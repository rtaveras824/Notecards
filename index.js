const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const languageRoutes = require('./routes/languages');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

// The MONGO_URL env variable needs to be set in heroku
mongoose.connect(process.env.MONGO_URL)
	.then(console.log('Connected to mongo'))
	.catch((err) => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/languages', languageRoutes);

app.get('/', (req, res) => {
	res.send('This is the datebase.');
})

app.listen(port, () => {
	console.log("Process started")
})