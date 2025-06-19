const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level: {
    type: Number,
    enum: [1, 2], // Level 1 (direct), Level 2 (indirect)
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purchaseAmount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Earning', earningSchema);
