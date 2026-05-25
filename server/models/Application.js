import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    status: {
      type: String,
      enum: ['pending', 'applied', 'interview', 'rejected', 'offer'],
      default: 'pending',
    },
    resumeVersion: { type: String },
    coverLetter: { type: String },
    appliedAt: { type: Date },
    notes: { type: String },
    automationLog: { type: String },
  },
  { timestamps: true }
);

applicationSchema.index({ user: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
