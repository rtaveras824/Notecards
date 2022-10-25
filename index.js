const express = require('express');
const app = express();
const dotenv = require('dotenv');

const port = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
	.then(console.log('Connected to mongo'))
	.catch((err) => console.error(err));

app.get('/', (req, res) => {
	res.send('Done');
})

app.listen(port, () => {
	console.log("Process started")
})