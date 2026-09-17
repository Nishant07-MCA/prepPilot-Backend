import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true },
  explanation: { type: String }
});

export const Question = mongoose.model('Question', questionSchema);

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true }
}, { timestamps: true });

export const QuestionAttempt = mongoose.model('QuestionAttempt', attemptSchema);