import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  role: { type: String, required: true },
  weekNumber: { type: Number, required: true },
  title: { type: String, required: true },
  tasks: [{
    title: { type: String, required: true },
    topic: { type: String, required: true }
  }]
});

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
}, { timestamps: true });

export const UserRoadmapProgress = mongoose.model('UserRoadmapProgress', userProgressSchema);