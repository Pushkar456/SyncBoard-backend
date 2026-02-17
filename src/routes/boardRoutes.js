import { Router } from 'express';
const router = Router();
import { createBoard, getMyBoards } from '../controllers/boardController.js';

// All routes here are prefixed with /api/boards
router.post('/', createBoard);     // Create a Board [cite: 8]
router.get('/', getMyBoards);      // Get user's Boards

export default router;