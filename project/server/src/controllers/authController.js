const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, location, skills, bio, website, linkedin } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address',
        errors: { email: 'Invalid email format' }
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long',
        errors: { password: 'Password too short' }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists',
        errors: { email: 'Email already registered' }
      });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      location,
      skills: Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : []),
      bio,
      website,
      linkedin
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        errors: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password',
        errors: { email: 'User not found' }
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid email or password',
        errors: { password: 'Incorrect password' }
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      skills: user.skills,
      bio: user.bio,
      createdAt: user.createdAt
    };

    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// Google OAuth login/register
exports.googleAuth = async (req, res) => {
  try {
    const { googleToken, name, email } = req.body;

    if (!googleToken || !email) {
      return res.status(400).json({ 
        message: 'Google token and email are required' 
      });
    }

    // In a real implementation, you would verify the Google token here
    // For now, we'll assume the token is valid and proceed

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user
      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        password: Math.random().toString(36).slice(-10), // Random password for OAuth users
        role: 'user'
      });
      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      skills: user.skills,
      bio: user.bio,
      createdAt: user.createdAt
    };

    res.json({
      message: 'Google authentication successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      message: 'Server error during Google authentication',
      error: error.message 
    });
  }
};

// Verify token middleware
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

