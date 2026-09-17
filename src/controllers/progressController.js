import { QuestionAttempt } from '../models/Practice.js';
import { CodingSubmission } from '../models/CodingProblem.js';
import { UserRoadmapProgress, Roadmap } from '../models/RoadMap.js';
import { InterviewSession } from '../models/Interview.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalAttempts = await QuestionAttempt.countDocuments({ userId });
    const correctAttempts = await QuestionAttempt.countDocuments({ userId, isCorrect: true });
    const codingSolved = await CodingSubmission.countDocuments({ userId });
    const completedTasks = await UserRoadmapProgress.countDocuments({ userId, status: 'Completed' });
    const interviewCount = await InterviewSession.countDocuments({ userId });

    const roadmaps = await Roadmap.find();
    let totalTasksCount = 0;
    roadmaps.forEach(r => { totalTasksCount += r.tasks.length; });

    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    const roadmapPercent = totalTasksCount > 0 ? Math.round((completedTasks / totalTasksCount) * 100) : 0;

    res.json({
      questionsSolved: totalAttempts,
      accuracy: `${accuracy}%`,
      codingProblems: codingSolved,
      roadmapProgress: `${roadmapPercent}%`,
      interviewsCompleted: interviewCount,
      interviewScore: interviewCount > 0 ? '85%' : 'N/A'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};