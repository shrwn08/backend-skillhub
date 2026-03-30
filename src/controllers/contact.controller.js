import Contact from "../models/contact.model.js"


export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, skills, interests } = req.body;
 
    const entry = await Contact.create({
      name,
      email,
      phone:     phone     || '',
      subject:   subject   || 'get_started',
      message,
      skills:    skills    || [],
      interests: interests || [],
    });
 
    res.status(201).json({
      success: true,
      message: "Thanks! We've received your message and will be in touch soon.",
      data: { id: entry._id },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//  GET /api/contact   (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
 
    const total    = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
 
    res.json({ success: true, total, page: Number(page), data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  PUT /api/contact/:id   (admin only – update status/note)
export const updateContact = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const updates = {};
    if (status)    { updates.status = status; if (status === 'replied') updates.repliedAt = new Date(); }
    if (adminNote) updates.adminNote = adminNote;
 
    const entry = await Contact.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' });
 
    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};