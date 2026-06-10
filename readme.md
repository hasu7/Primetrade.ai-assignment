📌 Task Manager App (MERN)

A simple full-stack task management app with authentication and CRUD features.

🚀 Features
User register & login (JWT auth)
Create, view, update, delete tasks
Mark tasks as pending/completed
Role-based access (admin/user)
Protected routes
🛠 Tech Stack

Frontend:

React (Vite)
Axios
React Router
Tailwind CSS

Backend:

Node.js
Express
MongoDB
Mongoose
JWT
📁 Project Structure
backend/
frontend/
README.md
⚙️ Setup Instructions
1. Clone repo
git clone <repo-url>
cd project-folder
2. Backend setup
cd backend
npm install

Create .env file:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run backend:

npm run dev
3. Frontend setup
cd frontend
npm install
npm run dev
🌐 API Routes
Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
Tasks (Protected)
GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
🔐 Notes
Login required for tasks
JWT stored in localStorage
Admin can delete tasks
📌 Status

Project completed