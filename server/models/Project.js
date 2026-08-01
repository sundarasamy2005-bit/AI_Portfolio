const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  languages: {
    type: String, // e.g., "React, Three.js"
    required: true,
  },
  img: {
    type: String, // URL of the image
    required: true,
  },
  github: {
    type: String,
  },
  liveDemo: {
    type: String,
  },
  linkedin: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
