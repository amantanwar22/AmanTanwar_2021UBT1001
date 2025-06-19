Multi-Level Referral & Earning System :

This project implements a referral-based earning system where users can refer others and earn profits based on purchases made by their referrals, up to two levels deep. The goal was to create a backend that tracks users, referrals, purchases, and distributes real-time earnings with a clean and scalable structure.

Name: Aman Tanwar
RollNo: 2021UBT1001  
Email: aman.tanwar.ug21nsut.ac.in  
Task: AmanTanwar_2021UBT1001
Role: Backend

Key Features:
- User registration with optional referral ID
- Maximum 8 direct referrals per user
- 5% earning from direct referrals (Level 1)
- 1% earning from indirect referrals (Level 2)
- Purchase threshold: only applies for purchases above ₹1000
- Real-time notifications to referrers using WebSockets (Socket.IO)
- API to fetch earning breakdowns for any user

Tech Stack:
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO for real-time updates
- Dotenv, CORS, Nodemon for development

How to Run the Project:

1. Unzip the project folder.
2. Open terminal and navigate into the project:
   cd referral-system
3. Install required packages:
   npm install
4. Create a .env file in the root folder and add:
   PORT=5001  
   MONGO_URI=mongodb://127.0.0.1:27017/referral-system
5. Start the server:
   npm run dev
The server will run at http://localhost:5001

System Explanation:

Let’s say I register first as Aman Tanwar. I don’t use a referral. Next, Harsh registers and uses my user ID as a referral. Later, another person registers using Harsh’s referral. Now if that third user makes a purchase above ₹1000, Harsh (Level 1) earns 5%, and I (Level 2) earn 1%. These earnings are stored in the database and are also sent instantly if we’re online.

API Endpoints:

POST /api/users/register  
Registers a new user with or without a referral.  
Example:
{
  "name": "Aman Tanwar",
  "email": "aman@example.com"
}
With referral:
{
  "name": "Harsh",
  "email": "harsh@example.com",
  "referredBy": "AMAN_USER_ID"
}

POST /api/purchase  
Simulates a purchase. Triggers earnings if amount > ₹1000.  
Example:
{
  "buyerId": "USER_ID",
  "amount": 1500
}

GET /api/users/:userId/earnings  
Fetches total earnings and detailed source breakdown for a user.

Real-Time Notification:

If the referrers are connected via socket, they receive:
```js
const socket = io('http://localhost:5001');
socket.emit('register', userId);
socket.on('newEarning', (data) => {
  alert(`You earned ₹${data.amount} from Level ${data.level}`);
});

Assignment Checklist:

->Multi-level referral tracking
->Profit distribution logic (5% & 1%)
->Purchase amount validation
->Max 8 referrals enforced
->Real-time WebSocket notification
->Earnings reporting API
->Code written and explained step-by-step

About the Author:
I am Aman Tanwar, a backend-focused fresher. I developed this project from scratch using what I learned 
through video tutorials and hands-on practice. While building it, I also referred to official documentation 
such as the WebSocket (Socket.IO) docs, Mongoose docs, and Express.js API to understand how things work in 
depth.My focus was on understanding the logic clearly, writing clean code, and covering all real-world use 
cases mentioned in the task.