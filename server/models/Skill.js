const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // e.g., "fab fa-html5"
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  color: {
    type: String, // e.g., "#e34c26"
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
