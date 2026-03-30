import Mentor from "../models/mentor.model.js"
import User from "../models/user.model.js"

//  GET /api/mentors

export const getAllMentors = async (req, res) => {
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

//GET /api/mentors/:id   (with availability slots)
export const getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate(
      'user', 'name email bio location skills'
    );
    if (!mentor || !mentor.isApproved) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    res.json({ success: true, data: mentor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//POST /api/mentors/apply   (protected – any user becomes mentor applicant)
export const applyAsMentor = async (req, res) => {
  try {
    const existing = await Mentor.findOne({ user: req.user._id });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Mentor profile already exists' });
    }
 
    const { headline, expertise, experience, languages, availability } = req.body;
    const mentor = await Mentor.create({
      user: req.user._id,
      headline,
      expertise:    expertise    || [],
      experience:   experience   || 0,
      languages:    languages    || [],
      availability: availability || [],
    });
 
    // Update user role
    await User.findByIdAndUpdate(req.user._id, { role: 'mentor' });
 
    res.status(201).json({ success: true, data: mentor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//PUT /api/mentors/:id   (mentor can update own profile)
export const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
 
    // Only allow the mentor themselves or admin
    const isOwner = mentor.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorised' });
    }
 
    const allowed = ['headline', 'expertise', 'experience', 'languages', 'availability'];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
 
    const updated = await Mentor.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true,
    }).populate('user', 'name email');
 
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//GET /api/mentors/:id/slots   – available (unbooked) slots
export const getAvailableSlots = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).select('availability');
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
 
    const freeSlots = mentor.availability.filter((s) => !s.isBooked);
    res.json({ success: true, data: freeSlots });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};