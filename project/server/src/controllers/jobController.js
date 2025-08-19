const Job = require('../models/Job');
const { scrapeNaukriJobs } = require('../utils/scraper');

async function listJobs(req, res) {
	const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(200);
	res.json(jobs);
}

async function createJob(req, res) {
	const job = await Job.create({ ...req.body, source: 'admin' });
	res.status(201).json(job);
}

async function updateJob(req, res) {
	const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!job) return res.status(404).json({ message: 'Not found' });
	res.json(job);
}

async function deleteJob(req, res) {
	const job = await Job.findByIdAndDelete(req.params.id);
	if (!job) return res.status(404).json({ message: 'Not found' });
	res.json({ ok: true });
}

async function scrape(req, res) {
	const jobs = await scrapeNaukriJobs();
	res.json({ count: jobs.length });
}

module.exports = { listJobs, createJob, updateJob, deleteJob, scrape };

