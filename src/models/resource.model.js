import mongoose from "mongoose"

const ResourceSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['video', 'article', 'checklist', 'course'],
      required: true,
    },
    description: { type: String, maxlength: 600 },
    topic: {
      type: String,
      enum: ['marketing', 'finance', 'legal', 'operations', 'sales', 'general'],
      default: 'general',
    },
    difficulty:  { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
 
    // For videos / courses: external URL only (no file upload in Phase 1)
    externalUrl: { type: String },                        // YouTube / external link
    duration:    { type: String },                        // "18 min" or "2h 30m"
 
    // For articles / checklists: plain-text or markdown body
    body:        { type: String },
 
    isFree:      { type: Boolean, default: true },
    isFeatured:  { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
 
    uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
 
ResourceSchema.index({ title: 'text', description: 'text' });


const Resource = mongoose.model('Resource', ResourceSchema);


export default Resource;