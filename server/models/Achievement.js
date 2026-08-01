const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  certImg: {
    type: String, // URL of certificate image
    required: true,
  },
  certName: {
    type: String,
  },
  workingDetails: {
    type: String,
  },
  linkedinPost: {
    type: String,
  },
  driveLink: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
