import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customProjectRequestSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true,
    enum: ['hardware', 'software', 'consulting', 'other']
  },
  budget: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large']
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in_review', 'accepted', 'rejected']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("CustomProjectRequest", customProjectRequestSchema); 