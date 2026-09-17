import express from 'express';
import { getRoadmap, updateTaskStatus } from '../controllers/RoadMapController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, getRoadmap);
router.put('/tasks/:taskId', protect, updateTaskStatus);

export default router;