const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  level: {
    type: String, // e.g., "High School", "College"
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  score: {
    type: String, // e.g., "Percentage: 94%", "CGPA: 8.9"
  },
  icon: {
    type: String, // e.g., "fas fa-school"
  },
  color: {
    type: String, // e.g., "#f9d423"
  }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
