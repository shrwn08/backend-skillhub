import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 80 },
    email:   { type: String, required: true, lowercase: true, trim: true },
    phone:   { type: String, trim: true, maxlength: 20 },
    subject: {
      type: String,
      enum: ['get_started', 'mentor_inquiry', 'general', 'feedback', 'report'],
      default: 'get_started',
    },
    message:   { type: String, required: true, maxlength: 1000 },
    skills:    [{ type: String }],     // pre-filled from quiz on Get Started form
    interests: [{ type: String }],
 
    // Admin workflow
    status:    { type: String, enum: ['new', 'read', 'replied', 'closed'], default: 'new' },
    repliedAt: { type: Date },
    adminNote: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);


const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;