const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true, required: true, lowercase: true, trim: true },
		password: { type: String, required: true, minlength: 6 },
		name: { type: String, required: true },
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
		phone: { type: String },
		location: { type: String },
		skills: { type: [String], default: [] },
		bio: { type: String },
		website: { type: String },
		linkedin: { type: String }
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10));
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods.comparePassword = function (candidate) {
	return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);


