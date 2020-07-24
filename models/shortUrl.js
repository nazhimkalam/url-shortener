const mongoose = require('mongoose');

// this package is used to create short URls
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate, // this is used to create a short id/url
	},
	clicks: {
		type: Number,
		required: true,
		default: 0,
	},
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);  // we can use any name "ShortUrl" because this name won't be used but we use the shortUrlSchema
