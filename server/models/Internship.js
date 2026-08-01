const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tech: {
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
  linkedinLink: {
    type: String,
  },
  implantBadge: {
    type: String,
  },
  driveLink: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
