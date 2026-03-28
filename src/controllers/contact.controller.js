import Contact from "../models/contact.model.js"


exports.submitContact = async (req, res) => {
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