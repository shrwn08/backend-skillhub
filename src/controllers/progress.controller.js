import Progress from "../models/progress.model.js"
import Idea from "../models/idea.model.js"


//  GET /api/progress/:ideaId   (protected)

export const getProgress = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);
    if (!idea) return res.status(404).json({ success: false, message: 'Idea not found' });
 
    let progress = await Progress.findOne({
      user: req.user._id, idea: req.params.ideaId,
    });
 
    // Auto-create on first access
    if (!progress) {
      const steps = idea.roadmapSteps.map((s) => ({
        stepId:     s._id,
        stepNumber: s.stepNumber,
        completed:  false,
      }));
      progress = await Progress.create({
        user:  req.user._id,
        idea:  req.params.ideaId,
        steps,
      });
    }
 
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  PUT /api/progress/:ideaId/step/:stepId

export const toggleStep = async (req, res) => {
  try {
    let progress = await Progress.findOne({
      user: req.user._id, idea: req.params.ideaId,
    });
 
    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress record not found. Start the roadmap first.' });
    }
 
    const step = progress.steps.find(
      (s) => s.stepId.toString() === req.params.stepId
    );
    if (!step) {
      return res.status(404).json({ success: false, message: 'Step not found' });
    }
 
    step.completed   = !step.completed;
    step.completedAt = step.completed ? new Date() : undefined;
 
    // Check if all steps done
    progress.isCompleted = progress.steps.every((s) => s.completed);
    if (progress.isCompleted) progress.completedAt = new Date();
 
    await progress.save();
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  GET /api/progress/all

export const getAllProgress = async (req, res) => {
  try {
    const records = await Progress.find({ user: req.user._id })
      .populate('idea', 'title emoji category');
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};