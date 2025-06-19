const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const connectedUsers = new Map();


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

// Placeholder route
app.get('/', (req, res) => {
  res.send('Referral system backend is running...');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const purchaseRoutes = require('./routes/purchaseRoutes');
app.use('/api/purchase', purchaseRoutes);


// Socket.io basic setup , and now changed later written in notebook too
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Store userId when user joins
  socket.on('register', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log('Client disconnected:', socket.id);
  });
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
