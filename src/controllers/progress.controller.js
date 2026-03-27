import Progress from "../models/progress.model.js"
import Idea from "../models/idea.model.js"


//  GET /api/progress/:ideaId   (protected)

exports.getProgress = async (req, res) => {
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