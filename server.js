const express = require('express');
const mongoose = require('mongoose');
const app = express();

const ShortUrl = require('./models/shortUrl');

// connecting to database
mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	const shortUrls = await ShortUrl.find();
	res.render('index', { shortUrls: shortUrls.reverse() });
});

app.post('/shortUrls', async (req, res) => {
	await ShortUrl.create({ full: req.body.fullUrl });

	res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
	if (shortUrl == null) {
		res.send('Not Found');
	} else {
		shortUrl.clicks++; // incrementing the clicks by the user
		shortUrl.save();

		res.redirect(shortUrl.full);
	}
});

app.listen(5000, () => {
	console.log('Server running...');
});
