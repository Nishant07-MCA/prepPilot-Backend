import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  college: { type: String, default: '' },
  degree: { type: String, default: '' },
  branch: { type: String, default: '' },
  gradYear: { type: Number },
  targetRole: { type: String, default: '' },
  skills: [{
    name: { type: String, required: true },
    proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
  }],
  resumeUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);