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

//  GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;
 
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
 
    res.json({ success: true, total, page: Number(page), data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  PUT /api/admin/users/:id/toggle-active
exports.toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, data: { id: user._id, isActive: user.isActive } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  GET /api/admin/mentors/pending   
exports.getPendingMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({ isApproved: false })
      .populate('user', 'name email createdAt');
    res.json({ success: true, data: mentors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  PUT /api/admin/mentors/:id/approve
exports.approveMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('user', 'name email');
 
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
    res.json({ success: true, data: mentor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


 // GET /api/admin/resources/pending 
exports.getPendingResources = async (req, res) => {
  try {
    const resources = await Resource.find({ isPublished: false })
      .populate('uploadedBy', 'name email');
    res.json({ success: true, data: resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};