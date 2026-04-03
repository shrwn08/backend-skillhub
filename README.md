# SkillHub Backend API

🔗 Repository: https://github.com/shrwn08/backend-skillhub.git

This is the backend server for the SkillHub platform. It provides REST APIs for authentication, mentors, sessions, resources, ideas, bookmarks, and user progress.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## 📁 Project Structure

src/
│── DB/                 
│── controllers/        
│── middlewares/        
│── models/             
│── routes/             
│── index.js

## ⚙️ Installation

git clone https://github.com/shrwn08/backend-skillhub.git
cd backend-skillhub
npm install

## 🔐 Environment Variables

Create a `.env` file:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key

## ▶️ Run Server

npm start

For development:

npm run dev

## 📡 API Endpoints

### 🔑 Auth
- POST /api/auth/register
- POST /api/auth/login

### 👤 User
- GET /api/user/profile

### 🎯 Mentors
- GET /api/mentors
- POST /api/mentors

### 📅 Sessions
- GET /api/sessions
- POST /api/sessions

### 📚 Resources
- GET /api/resources

### 💡 Ideas
- GET /api/ideas
- POST /api/ideas

### 🔖 Bookmarks
- GET /api/bookmarks
- POST /api/bookmarks

### 📈 Progress
- GET /api/progress

### 📩 Contact
- POST /api/contact

## 🔒 Authentication

Use JWT token in headers:

Authorization: Bearer <token>

## 📌 Features

- User authentication & authorization
- Mentor booking system
- Resource management
- Idea sharing platform
- Bookmarking system
- Progress tracking

## 🛠️ Future Improvements

- Payment integration
- Real-time chat
- Notifications

## 👨‍💻 Author

Shrawan Singh