import User from "../models/user.model.js"
import Mentor from "../models/mentor.model.js"
import Idea from "../models/idea.model.js"
import Resource from "../models/resource.model.js"
import Session from "../models/session.model.js"
import Progress from "../models/progress.model.js"
import Contact from "../models/contact.model.js"


//  GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const [
      totalUsers, totalMentors, totalIdeas,
      totalResources, totalSessions, completedRoadmaps,
      newContacts,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Mentor.countDocuments({ isApproved: true }),
      Idea.countDocuments({ isActive: true }),
      Resource.countDocuments({ isPublished: true }),
      Session.countDocuments(),
      Progress.countDocuments({ isCompleted: true }),
      Contact.countDocuments({ status: 'new' }),
    ]);
 
    res.json({
      success: true,
      data: {
        totalUsers, totalMentors, totalIdeas,
        totalResources, totalSessions, completedRoadmaps, newContacts,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};