async function scrapeNaukriJobs() {
	return [
		{
			title: 'Software Engineer',
			company: 'Demo Corp',
			location: 'Remote',
			description: 'JavaScript, React, Node.js, REST APIs',
			source: 'naukri',
			url: 'https://www.naukri.com/',
			postedAt: new Date()
		}
	];
}

module.exports = { scrapeNaukriJobs };

