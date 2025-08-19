const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		company: String,
		location: String,
		description: { type: String, required: true },
		source: { type: String, enum: ['admin', 'naukri'], default: 'admin' },
		url: String,
		postedAt: Date
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);

