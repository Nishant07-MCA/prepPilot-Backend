import mongoose from 'mongoose';

const codingProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  description: { type: String, required: true },
  examples: [{ input: String, output: String, explanation: String }],
  constraints: [String]
});

export const CodingProblem = mongoose.model('CodingProblem', codingProblemSchema);

const codingSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'CodingProblem', required: true },
  language: { type: String, required: true },
  codeText: { type: String, required: true },
  status: { type: String, default: 'Submitted' }
}, { timestamps: true });

export const CodingSubmission = mongoose.model('CodingSubmission', codingSubmissionSchema);