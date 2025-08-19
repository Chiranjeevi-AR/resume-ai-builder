require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { connectMongo } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await connectMongo();
		const server = http.createServer(app);
		server.listen(PORT, () => {
			console.log(`Server listening on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
}

start();

