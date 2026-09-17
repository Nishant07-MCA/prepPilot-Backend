import { Roadmap, UserRoadmapProgress } from '../models/RoadMap.js';

export const getRoadmap = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().sort({ weekNumber: 1 });
    const userProgress = await UserRoadmapProgress.find({ userId: req.user.id });

    const progressMap = new Map(userProgress.map(p => [p.taskId, p.status]));

    const response = roadmaps.map(rm => ({
      _id: rm._id,
      role: rm.role,
      weekNumber: rm.weekNumber,
      title: rm.title,
      tasks: rm.tasks.map(t => ({
        _id: t._id,
        title: t.title,
        topic: t.topic,
        status: progressMap.get(t._id.toString()) || 'Pending'
      }))
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body; // 'Pending', 'In Progress', 'Completed'

    const progress = await UserRoadmapProgress.findOneAndUpdate(
      { userId: req.user.id, taskId },
      { status },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};