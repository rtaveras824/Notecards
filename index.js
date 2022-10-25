const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const userRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
	.then(console.log('Connected to mongo'))
	.catch((err) => console.error(err));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
	res.send('This is the datebase.');
})

app.listen(port, () => {
	console.log("Process started")
})