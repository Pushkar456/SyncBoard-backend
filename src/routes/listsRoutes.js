import { Router } from 'express';
const router = Router();
import { createList, getListsByBoard, deleteList,updateList } from '../controllers/listController.js';

// All routes here are prefixed with /api/lists
router.post('/', createList);               // Create List 
router.get('/:boardId', getListsByBoard);          // Get List  
router.delete('/:id', deleteList);        
router.patch('/:id', updateList);        

export default router;