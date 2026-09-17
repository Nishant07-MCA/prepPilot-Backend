import express from 'express';
import { 
  getQuestions, 
  submitQuestion, 
  getCodingProblems, 
  getCodingProblemById, 
  submitCodingProblem, 
  submitInterview 
} from '../controllers/practiceController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();
// MCQ Practice
router.get('/questions', getQuestions);
router.post('/questions/:id/submit', protect, submitQuestion);
// Coding Practice
router.get('/coding/problems', protect, getCodingProblems);
router.get('/coding/problems/:id', protect, getCodingProblemById);
router.post('/coding/problems/:id/submit', protect, submitCodingProblem);
// Mock Interview
router.post('/interview/submit', protect, submitInterview);
export default router;