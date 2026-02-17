import { Router } from 'express';
const router = Router();
import { createTask, moveTask, getTasks } from '../controllers/taskController.js';

// All routes here are prefixed with /api/tasks
router.post('/', createTask);               // Create Task 
router.get('/:boardId', getTasks);          // Get Tasks with Pagination & Search 
router.patch('/:id/move', moveTask);        // Drag and drop task across lists [cite: 10]

export default router;