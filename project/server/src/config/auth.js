module.exports = {
	jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
	bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
	adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com'
};

