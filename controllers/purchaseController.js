const User = require('../models/User');
const Earning = require('../models/Earning');
const { getIO, connectedUsers } = require('../socket');
const io = getIO();



const handlePurchase = async (req, res) => {
  try {
    const { buyerId, amount } = req.body;

    // Basic validation
    if (!buyerId || !amount) {
      return res.status(400).json({ message: 'buyerId and amount are required' });
    }

    if (amount <= 1000) {
      return res.status(200).json({ message: 'No earnings, purchase below ₹1000' });
    }

    const buyer = await User.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const earnings = [];

    // Level 1 referrer (direct)
    if (buyer.referredBy) {
      const level1User = await User.findById(buyer.referredBy);
      if (level1User) {
        const level1Amount = amount * 0.05;
        earnings.push({
          user: level1User._id,
          fromUser: buyer._id,
          level: 1,
          amount: level1Amount,
          purchaseAmount: amount
        });

        // Level 2 referrer (referrer's referrer)
        if (level1User.referredBy) {
          const level2User = await User.findById(level1User.referredBy);
          if (level2User) {
            const level2Amount = amount * 0.01;
            earnings.push({
              user: level2User._id,
              fromUser: buyer._id,
              level: 2,
              amount: level2Amount,
              purchaseAmount: amount
            });
          }
        }
      }
    }

    // Save all earnings
    if (earnings.length > 0) {
      await Earning.insertMany(earnings);
    }
    // Notify users if they are connected
earnings.forEach(earning => {
  const socketId = connectedUsers.get(earning.user.toString());
  if (socketId) {
    io.to(socketId).emit('newEarning', {
      amount: earning.amount,
      fromUser: buyer.name || 'Someone',
      level: earning.level,
      purchaseAmount: earning.purchaseAmount
    });
  }
});


    res.status(200).json({
      message: 'Purchase recorded and earnings distributed',
      totalEarnings: earnings.length,
      breakdown: earnings
    });

  } catch (err) {
    console.error('Purchase Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  handlePurchase
};
