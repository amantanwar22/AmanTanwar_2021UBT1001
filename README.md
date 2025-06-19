# Multi-Level Referral & Earning System

This backend project implements a referral-based earning system where users can invite others and earn profits from purchases made by their direct and indirect referrals. It supports two levels of earnings and includes real-time updates using Socket.IO.

## Developer Info
- Name: Aman Tanwar  
- Roll No: 2021UBT1001  
- Email: aman.tanwar.ug21nsut.ac.in  
- Task ID: AmanTanwar_2021UBT1001  
- Role: Backend Developer

## Key Features
- User registration with optional referral ID  
- Max 8 direct referrals per user  
- 5% earning from direct referrals (Level 1)  
- 1% earning from indirect referrals (Level 2)  
- Earnings triggered only if purchase > ₹1000  
- Real-time WebSocket notifications using Socket.IO  
- API to fetch detailed earning reports

## Tech Stack
- Node.js + Express.js  
- MongoDB + Mongoose  
- Socket.IO for real-time events  
- dotenv, CORS, Nodemon for development

## Folder Structure
```
AmanTanwar_2021UBT1001/
├── controllers/         # Handles business logic (purchase, user, earnings)
├── routes/              # Express route handlers
├── models/              # Mongoose schemas
├── config/              # MongoDB connection config
├── socket.js            # WebSocket server setup
├── server.js            # Main entry point
├── .env.example         # Sample env file
├── README.md            # Project overview
```

## How to Run
1. Clone the repo  
   `git clone https://github.com/amantanwar22/AmanTanwar_2021UBT1001.git && cd AmanTanwar_2021UBT1001`

2. Install dependencies  
   `npm install`

3. Create a `.env` file in the root folder:
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/referral-system
```

4. Start the server  
   `npm run dev`

5. Open [http://localhost:5001](http://localhost:5001) and test using Postman.

## API Endpoints

### Register a User  
**POST** `/api/users/register`

Without referral:
```json
{
  "name": "Aman",
  "email": "aman@example.com"
}
```

With referral:
```json
{
  "name": "Harsh",
  "email": "harsh@example.com",
  "referredBy": "AMAN_USER_ID"
}
```

### Make a Purchase  
**POST** `/api/purchase`
```json
{
  "buyerId": "USER_ID",
  "amount": 1500
}
```

*Earnings only apply if the amount is greater than ₹1000.*

### Get Earnings  
**GET** `/api/users/:userId/earnings`

Example Response:
```json
{
  "totalEarnings": 75,
  "earnings": [
    {
      "from": "Harsh",
      "level": 1,
      "amount": 75,
      "purchase": 1500,
      "date": "2025-06-19T12:35:05.347Z"
    }
  ]
}
```

## Real-Time Notifications

If users are connected via socket:
```js
const socket = io('http://localhost:5001');
socket.emit('register', userId);

socket.on('newEarning', (data) => {
  alert(`You earned ₹${data.amount} from Level ${data.level}`);
});
```

## Assignment Checklist
- Multi-level referral tracking  
- Profit logic: 5% (Level 1), 1% (Level 2)  
- ₹1000 purchase threshold check  
- Max 8 direct referrals  
- Real-time earning notifications  
- Earnings breakdown API  
- Modular folder structure  
- Environment config handled via `.env.example`

## About the Developer

This project was developed by Aman Tanwar as part of the backend assignment for AmanTanwar_2021UBT1001. The goal was to implement a robust referral and earnings system using Node.js, MongoDB, and WebSockets. The code was written from scratch with a strong focus on clean structure, modularity, and real-world use cases.

All flows were tested thoroughly using Postman, and the logic was built referring to official Express, Mongoose, and Socket.IO documentation.
