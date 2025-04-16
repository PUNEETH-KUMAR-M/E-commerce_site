import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  projectCode: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['robotics', 'iot', 'electronics', 'drones']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  components: [{
    name: String,
    quantity: Number
  }],
  skills: [{
    type: String
  }],
  duration: {
    type: String,
    required: true
  },
  documentation: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Project", projectSchema); 