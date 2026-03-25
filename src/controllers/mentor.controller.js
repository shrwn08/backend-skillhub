import Mentor from "../models/mentor.model.js"
import User from "../models/user.model.js"

//  GET /api/mentors

exports.getAllMentors = async (req, res) => {
  try {
    const { expertise, search, page = 1, limit = 9 } = req.query;
    const filter = { isApproved: true, isActive: true };
 
    if (expertise) filter.expertise = { $in: [new RegExp(expertise, 'i')] };
 
    const total   = await Mentor.countDocuments(filter);
    const mentors = await Mentor.find(filter)
      .populate('user', 'name email location skills')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ avgRating: -1 });
 
    // Optional: filter by user name if search query provided
    const result = search
      ? mentors.filter((m) =>
          m.user?.name?.toLowerCase().includes(search.toLowerCase())
        )
      : mentors;
 
    res.json({ success: true, total, page: Number(page), data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};