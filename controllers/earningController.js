const Earning = require('../models/Earning');

const getEarnings = async (req, res) => {
  try {
    const { userId } = req.params;

    const earnings = await Earning.find({ user: userId })
      .populate('fromUser', 'name email') // shows who made the purchase
      .sort({ timestamp: -1 });

    const total = earnings.reduce((sum, e) => sum + e.amount, 0);

    res.json({
      totalEarnings: total,
      earnings: earnings.map(e => ({
        from: e.fromUser.name,
        level: e.level,
        amount: e.amount,
        purchase: e.purchaseAmount,
        date: e.timestamp
      }))
    });
  } catch (err) {
    console.error('Earnings Fetch Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEarnings
};
