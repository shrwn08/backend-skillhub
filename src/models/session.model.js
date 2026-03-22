import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    mentor:    { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor',   required: true },
    mentee:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',     required: true },
    slotId:    { type: mongoose.Schema.Types.ObjectId },   // ref to availability slot _id
    date:      { type: Date, required: true },
    startTime: { type: String, required: true },           // "09:00"
    endTime:   { type: String, required: true },
    topic:     { type: String, maxlength: 300 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    // Post-session
    menteeRating:  { type: Number, min: 1, max: 5 },
    menteeReview:  { type: String, maxlength: 600 },
    notes:         { type: String, maxlength: 1000 },     // mentor's notes
  },
  { timestamps: true }
);


const Session = mongoose.model('session', SessionSchema);


export default Session;