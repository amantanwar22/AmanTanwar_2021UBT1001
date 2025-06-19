// socket.js
const connectedUsers = new Map();
let io = null;

function initSocket(server) {
  const socketIo = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

  io = socketIo;

  socketIo.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

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
}

function getIO() {
  return io;
}

module.exports = { initSocket, connectedUsers, getIO };
