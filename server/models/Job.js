import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    url: { type: String, required: true },
    source: { type: String, enum: ['linkedin', 'indeed', 'naukri', 'other'], default: 'other' },
    skillsRequired: [{ type: String }],
    matchScore: { type: Number, min: 0, max: 100 },
    postedAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
