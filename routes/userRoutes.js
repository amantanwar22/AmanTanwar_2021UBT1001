const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { getEarnings } = require('../controllers/earningController');

// Register route
router.post('/register', registerUser);

// Earnings report route
router.get('/:userId/earnings', getEarnings);

module.exports = router;
