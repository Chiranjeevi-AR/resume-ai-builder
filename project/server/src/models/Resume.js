const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
	{
		title: String,
		items: [{}]
	},
	{ _id: false }
);

const resumeSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		template: { type: String, default: 'classic' },
		basics: {
			name: String,
			email: String,
			phone: String,
			location: String,
			website: String,
			headline: String
		},
		education: [sectionSchema],
		experience: [sectionSchema],
		skills: [String],
		projects: [sectionSchema],
		pdfGeneratedAt: Date
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);

