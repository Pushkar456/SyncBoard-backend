# 🚀 SyncBoard – Backend

This repository contains the backend API powering SyncBoard.

🔗 Frontend Repository:  
https://github.com/Pushkar456/SyncBoard-frontend  

---

# 🏗️ Backend Architecture

The backend follows a layered MVC architecture:

Client  
→ Express Routes  
→ Controllers  
→ Services  
→ MongoDB Database  

### Design Principles

- RESTful API structure
- Middleware-based authentication
- Modular routing
- Environment-based configuration
- Real-time WebSocket communication

---

# 🧠 System Design

### Core Components

1. Authentication Service
2. Board Management Service
3. Task Management Service
4. Real-Time Event Gateway

### Real-Time Architecture

Client emits update  
→ Socket.io server receives  
→ Validates request  
→ Updates database  
→ Broadcasts event to board members  

---

# 🗄️ Database Schema Overview

### User Schema

- _id
- name
- email
- password (hashed)
- createdAt

### Board Schema

- _id
- title
- owner
- members[]
- lists[]
- createdAt

### List Schema

- _id
- title
- boardId
- position
- tasks[]

### Task Schema

- _id
- title
- description
- listId
- position
- createdAt

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Socket.io

---

# ⚙️ Local Development Setup

## Clone Repository

```bash
git clone https://github.com/Pushkar456/SyncBoard-backend.git
cd SyncBoard-backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

## Start Server

```bash
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

# 🚀 Production Deployment

### Option 1: Render

- Connect GitHub
- Add environment variables
- Deploy as Web Service

### Option 2: Railway

- Add project
- Set environment variables
- Deploy

### Option 3: Docker

```
docker build -t syncboard-backend .
docker run -p 5000:5000 syncboard-backend
```

---

# 🔐 Security Implementation

- bcrypt password hashing
- JWT authentication
- Protected routes middleware
- CORS configuration
- Environment variable protection

---

# 📈 Scalability & Improvements

- Horizontal scaling with load balancer
- Redis for caching
- WebSocket scaling with Redis adapter
- Microservice separation
- Role-based access control
- Activity logging

---

# 📡 API Overview

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

## Boards
- GET `/api/boards`
- POST `/api/boards`
- PUT `/api/boards/:id`
- DELETE `/api/boards/:id`

---

# 👨‍💻 Author

Pushkar Prajapat  
Full Stack Developer
