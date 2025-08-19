function tokenize(text) {
	return (text || '')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter(Boolean);
}

function unique(list) {
	return Array.from(new Set(list));
}

function matchTextToJob(resumeText, jobText) {
	const resumeTokens = unique(tokenize(resumeText));
	const jobTokens = unique(tokenize(jobText));
	if (jobTokens.length === 0) return { score: 0, matched: [], missing: [] };
	const jobSet = new Set(jobTokens);
	const matched = resumeTokens.filter(t => jobSet.has(t));
	const missing = jobTokens.filter(t => !matched.includes(t));
	const score = Math.round((matched.length / jobTokens.length) * 100);
	return { score, matched, missing, counts: { matched: matched.length, total: jobTokens.length } };
}

module.exports = { matchTextToJob };


