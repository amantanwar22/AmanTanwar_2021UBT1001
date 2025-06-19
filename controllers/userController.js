const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, referredBy } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // If referredBy exists, check referral count
    let referrer = null;
    if (referredBy) {
      referrer = await User.findById(referredBy);
      if (!referrer) {
        return res.status(400).json({ message: 'Invalid referral link' });
      }

      // Check if max 8 referrals reached
      if (referrer.referrals.length >= 8) {
        return res.status(400).json({ message: 'Referral limit reached for this user' });
      }
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      referredBy: referrer ? referrer._id : null
    });
    await newUser.save();

    // If referred, update referrer
    if (referrer) {
      referrer.referrals.push(newUser._id);
      await referrer.save();
    }

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });

  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser
};
