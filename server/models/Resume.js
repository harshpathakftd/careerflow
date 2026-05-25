import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalFile: { type: String, required: true },
    optimizedContent: { type: String },
    atsScore: { type: Number, min: 0, max: 100 },
    targetJobTitle: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
