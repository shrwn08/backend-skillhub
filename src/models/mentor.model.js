import mongoose from "mongoose";

const AvailabilitySlotSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      required: true,
    },
  },
  { _id: true },
);

const MentorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  headline: {
    type: String,
    maxlength: 120,
  },
  expertise: [
    {
      type: String,
      trim: true,
    },
  ],
  experience: {
    type: Number,
    default: 0,
  },
  language: [
    {
      type: String,
    },
  ],
  availability: [AvailabilitySlotSchema],

  //stats (updated by aggregation or manually)

  totalSessions: {
    type: Number,
    default: 0,
  },
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: { type: Number, default: 0 },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
},{timestamps : true});


const Mentor = mongoose.model("Mentor", MentorSchema);

export default Mentor;