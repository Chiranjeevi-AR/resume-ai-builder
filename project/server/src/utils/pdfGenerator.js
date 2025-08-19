const PDFDocument = require('pdfkit');

async function generateResumePdf(resume) {
	const doc = new PDFDocument({ margin: 36 });
	const basics = resume.basics || {};
	doc.fontSize(20).text(basics.name || 'Unnamed', { align: 'left' });
	doc.moveDown(0.5);
	doc.fontSize(10).text([basics.email, basics.phone, basics.location, basics.website].filter(Boolean).join(' | '));
	doc.moveDown();

	function section(title, rows) {
		if (!rows || rows.length === 0) return;
		doc.moveDown();
		doc.fontSize(14).text(title, { underline: true });
		rows.forEach(r => {
			doc.moveDown(0.25);
			doc.fontSize(12).text(r.title || '', { continued: false });
			if (Array.isArray(r.items)) {
				r.items.forEach(item => doc.fontSize(10).text(`- ${Object.values(item).join(' | ')}`));
			}
		});
	}

	section('Experience', resume.experience);
	section('Education', resume.education);
	if (Array.isArray(resume.skills) && resume.skills.length) {
		doc.moveDown();
		doc.fontSize(14).text('Skills', { underline: true });
		doc.fontSize(10).text(resume.skills.join(', '));
	}
	section('Projects', resume.projects);
	return doc;
}

module.exports = { generateResumePdf };


