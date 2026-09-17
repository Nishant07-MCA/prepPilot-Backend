import { Question, QuestionAttempt } from '../models/Practice.js';
import { CodingProblem, CodingSubmission } from '../models/CodingProblem.js';
import { InterviewSession } from '../models/Interview.js';

// MCQ Questions
export const getQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitQuestion = async (req, res) => {
  try {
    const { selectedOption } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const isCorrect = question.correctOption === Number(selectedOption);

    await QuestionAttempt.create({
      userId: req.user.id,
      questionId: question._id,
      selectedOption: Number(selectedOption),
      isCorrect
    });

    res.json({
      isCorrect,
      correctOption: question.correctOption,
      explanation: question.explanation
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Coding Problems
export const getCodingProblems = async (req, res) => {
  try {
    const problems = await CodingProblem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCodingProblemById = async (req, res) => {
  try {
    const problem = await CodingProblem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitCodingProblem = async (req, res) => {
  try {
    const { language, codeText } = req.body;
    const submission = await CodingSubmission.create({
      userId: req.user.id,
      problemId: req.params.id,
      language,
      codeText,
      status: 'Submitted'
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mock Interview Session
export const submitInterview = async (req, res) => {
  try {
    const { interviewType, answers } = req.body;
    const session = await InterviewSession.create({
      userId: req.user.id,
      interviewType,
      answers,
      score: 85
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};