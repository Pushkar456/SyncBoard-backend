import { Router } from 'express';
const router = Router();
import { getActivity } from '../controllers/activityController.js';

// All routes here are prefixed with /api/activity
router.get('/:boardId', getActivity);      // Activity history tracking 

export default router;