import dotenv from 'dotenv'
dotenv.config();


import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './src/config/db.js';
import socketService from './src/services/socketServices.js';

// Import Routes
import authRoutes from './src/routes/authRoutes.js';
import boardRoutes from './src/routes/boardRoutes.js';
import listRoutes from './src/routes/listsRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import activityRoutes from './src/routes/activityRoutes.js';

// Import Middleware
import protect from './src/middleware/authMiddleware.js';

const app = express();
const server = createServer(app);

// 1. Database Connection
connectDB();

// 2. Middleware
app.use(cors());
app.use(json());

// 3. Socket.io Setup (Real-time sync strategy)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  }
});


// Attach io to the request object so controllers can use it
app.set('socketio', io);

socketService(io);


// 4. API Routes
app.use('/api/auth', authRoutes);               // Authentication (Signup/Login)
app.use('/api/boards',protect,  boardRoutes);
app.use('/api/lists',protect,listRoutes)     // Board Management 
app.use('/api/tasks',protect,  taskRoutes);       // Task CRUD & DnD 
app.use('/api/activity',protect, activityRoutes); // Activity History 

// Health Check
app.get('/', (req, res) => {
  res.send('Task Collaboration API is running...');
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

