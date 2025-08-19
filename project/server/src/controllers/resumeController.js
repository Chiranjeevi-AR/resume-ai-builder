const Resume = require('../models/Resume');
const { generateResumePdf } = require('../utils/pdfGenerator');

async function getMyResume(req, res) {
	const resume = await Resume.findOne({ userId: req.user._id });
	return res.json(resume || null);
}

async function upsertMyResume(req, res) {
	const data = req.body || {};
	const resume = await Resume.findOneAndUpdate(
		{ userId: req.user._id },
		{ $set: { ...data, userId: req.user._id } },
		{ new: true, upsert: true }
	);
	return res.json(resume);
}

async function getMyResumePdf(req, res) {
	const resume = await Resume.findOne({ userId: req.user._id });
	if (!resume) return res.status(404).json({ message: 'No resume' });
	const pdf = await generateResumePdf(resume);
	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
	pdf.pipe(res);
	pdf.end();
}

module.exports = { getMyResume, upsertMyResume, getMyResumePdf };

