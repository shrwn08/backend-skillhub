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