const mongoose = require('mongoose');

async function connectMongo() {
	const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_ai';
	mongoose.set('strictQuery', true);
	await mongoose.connect(mongoUri, {
		bufferCommands: false,
	});
	console.log('MongoDB connected');
}

module.exports = { connectMongo };

