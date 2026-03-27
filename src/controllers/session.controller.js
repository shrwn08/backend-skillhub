import Session from "../models/session.model.js";
import Mentor from "../models/mentor.model.js"


//  POST /api/sessions   

exports.bookSession = async (req, res) => {
  try {
    const { mentorId, slotId, date, topic } = req.body;
 
    // 1. Load mentor and find the slot
    const mentor = await Mentor.findById(mentorId);
    if (!mentor || !mentor.isApproved) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
 
    const slot = mentor.availability.id(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }
    if (slot.isBooked) {
      return res.status(409).json({ success: false, message: 'Slot already booked' });
    }
 
    // 2. Prevent self-booking
    if (mentor.user.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot book your own session' });
    }
 
    // 3. Mark slot as booked (atomic-ish update)
    slot.isBooked = true;
    await mentor.save();
 
    // 4. Create session record
    const session = await Session.create({
      mentor:    mentorId,
      mentee:    req.user._id,
      slotId,
      date:      new Date(date),
      startTime: slot.startTime,
      endTime:   slot.endTime,
      topic:     topic || '',
      status:    'pending',
    });
 
    await session.populate([
      { path: 'mentor', populate: { path: 'user', select: 'name email' } },
      { path: 'mentee', select: 'name email' },
    ]);
 
    res.status(201).json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//  GET /api/sessions/my   (protected – sessions for logged-in user)
exports.getMySessions = async (req, res) => {
  try {
    const filter =
      req.user.role === 'mentor'
        ? { mentor: req.user._id }
        : { mentee: req.user._id };
 
    const sessions = await Session.find(filter)
      .populate({ path: 'mentor', populate: { path: 'user', select: 'name email' } })
      .populate('mentee', 'name email')
      .sort({ date: 1 });
 
    res.json({ success: true, data: sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  GET /api/sessions/my   (protected – sessions for logged-in user)
exports.getMySessions = async (req, res) => {
  try {
    const filter =
      req.user.role === 'mentor'
        ? { mentor: req.user._id }
        : { mentee: req.user._id };
 
    const sessions = await Session.find(filter)
      .populate({ path: 'mentor', populate: { path: 'user', select: 'name email' } })
      .populate('mentee', 'name email')
      .sort({ date: 1 });
 
    res.json({ success: true, data: sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET /api/sessions/:id   (protected)
exports.getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({ path: 'mentor', populate: { path: 'user', select: 'name email' } })
      .populate('mentee', 'name email');
 
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
 
    // Only mentor or mentee can view
    const isMentee = session.mentee._id.toString() === req.user._id.toString();
    const isMentor = session.mentor.user?._id?.toString() === req.user._id.toString();
    if (!isMentee && !isMentor && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorised' });
    }
 
    res.json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  PUT /api/sessions/:id/cancel   (protected)
exports.cancelSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
 
    if (session.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel a completed session' });
    }
 
    session.status = 'cancelled';
    await session.save();
 
    // Free up the slot on mentor's profile
    const mentor = await Mentor.findById(session.mentor);
    if (mentor) {
      const slot = mentor.availability.id(session.slotId);
      if (slot) { slot.isBooked = false; await mentor.save(); }
    }
 
    res.json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  PUT /api/sessions/:id/confirm   (mentor only)
exports.confirmSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate({
      path: 'mentor', populate: { path: 'user', select: '_id' },
    });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
 
    if (session.mentor.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Only the mentor can confirm' });
    }
 
    session.status = 'confirmed';
    await session.save();
    res.json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};