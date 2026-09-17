import mongoose from 'mongoose';

const interviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interviewType: { type: String, required: true },
  answers: [{
    questionText: { type: String, required: true },
    userAnswer: { type: String, required: true }
  }],
  score: { type: Number, default: 80 }
}, { timestamps: true });

export const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);