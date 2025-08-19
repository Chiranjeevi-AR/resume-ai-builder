const User = require('../models/User');

// Update user profile (name, phone, location, skills, bio, etc.)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, location, skills, bio, website, linkedin } = req.body;
    const update = { name, phone, location, skills, bio, website, linkedin };
    // Remove undefined fields
    Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);
    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
