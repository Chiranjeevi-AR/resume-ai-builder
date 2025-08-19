const { matchTextToJob } = require('../utils/aiMatcher');
const Job = require('../models/Job');
const Resume = require('../models/Resume');

async function matchText(req, res) {
	const { resumeText, jobText } = req.body;
	if (!resumeText || !jobText) return res.status(400).json({ message: 'Missing resumeText or jobText' });
	const result = matchTextToJob(resumeText, jobText);
	res.json(result);
}

async function matchIds(req, res) {
	const { resumeId, jobId } = req.body;
	if (!resumeId || !jobId) return res.status(400).json({ message: 'Missing resumeId or jobId' });
	const resume = await Resume.findById(resumeId);
	const job = await Job.findById(jobId);
	if (!resume || !job) return res.status(404).json({ message: 'Resume or Job not found' });
	const resumeText = JSON.stringify(resume);
	const jobText = job.description || '';
	const result = matchTextToJob(resumeText, jobText);
	res.json(result);
}

module.exports = { matchText, matchIds };


